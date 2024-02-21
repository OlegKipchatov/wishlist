import { SupabaseClient } from "@supabase/supabase-js";
import { Card, ICard, IUser, UserMetadata } from "./types";

type GetUserMetadataProps = {
    id?: string,
    login?: string,
}

export const supabaseWorker = (client: SupabaseClient) => {
    const users = {
        getSessionUser: async function () {
            const { data: { session } } = await client.auth.getSession();
            if(!session?.user) {
              return;
            }

            const user = {
                id: session.user.id,
                email: session.user.email,
                ...session.user.user_metadata,
            } as IUser;
            return user;
        },
        isAuthenticated: async function () {
            const { data: { user } } = await client.auth.getUser()
            return !!user;
        },
        getUserByIdOrLogin: async function({ id, login }: GetUserMetadataProps) {
          const eqObj = id ? { column: 'id', value: id } : { column: 'login', value: login };

          try {
            const { data, error } = await client.from('profiles').select('*').eq(eqObj.column, eqObj.value);
            
            if(error) {
              console.error('Error fetching user metadata:', error.message);
              return;
            }

            return data[0] as IUser;
          } catch (e: any) {
            console.error('Error fetching user metadata:', e.message);
          }
        },
        updateUserMetadata: async function (userMetadata: UserMetadata) {
            try {
                const { error } = await client.auth.updateUser({
                    data: userMetadata,
                });
                
                if (error) {
                    console.error('Error update user metadata for auth.user', error.message);
                    return;
                }
            } catch (e: any) {
                console.error('Error update user metadata', e.message);
            }
        },
    };

    const storage = {
        getPublicCardImageUrl: async function(imageName: string, userId: string = '') {
            const uid = userId ?? (await users.getSessionUser())?.id;
            const { data: { publicUrl } } = client.storage.from('images').getPublicUrl(`${uid}/${imageName}`);
            return publicUrl;
        },
        uploadCardImage: async function(image: File) {
            try {
                const uid = (await users.getSessionUser())?.id;
                const { error } = await client.storage
                    .from('images')
                    .upload(`${uid}/${image.name}`, image);

                if (error) {
                    console.error('Error upload image:', error.message);
                    return false;
                }

                return true;
            } catch (e: any) {
                console.error('Error upload image:', e.message);
                return false;
            }
        },
        removeCardImage: async function(imageName: string) {
            try {
                const uid = (await users.getSessionUser())?.id;
                const { error } = await client.storage
                    .from('images')
                    .remove([`${uid}/${imageName}`]);

                if (error) {
                    console.error('Error remove image:', error.message);
                    return false;
                }

                return true;
            } catch (e: any) {
                console.error('Error remove image:', e.message);
                return false;
            }
        },
    };

    const items = {
        setItem: async function(item: Card) {
            try {
                const { error } = await client
                    .from('wish_list')
                    .insert({...item, image: item.image?.name});

                if(item.image) {
                    await storage.uploadCardImage(item.image);
                }

                if (error) {
                    console.error('Error set product:', error.message);
                    return false;
                }

                return true;
            } catch (e: any) {
                console.error('Error set product:', e.message);
                return false;
            }
        },
        updateItem: async function(oldCard: ICard, newCard: Card) {
            try {
                const { error } = await client
                    .from('wish_list')
                    .update({...newCard, image: newCard.image?.name})
                    .eq('id', oldCard.id);

                if(newCard.image) {
                    await storage.uploadCardImage(newCard.image);
                }

                if(oldCard.image) {
                    storage.removeCardImage(oldCard.image);
                }

                if (error) {
                    console.error('Error set product:', error.message);
                    return false;
                }

                return true;
            } catch (e: any) {
                console.error('Error set product:', e.message);
                return false;
            }
        },
        removeItem: async function(card: ICard) {
            try {
                const { error } = await client.from('wish_list').delete().eq('id', card.id);
                if(card.image) {
                    storage.removeCardImage(card.image);
                }
        
                if (error) {
                    console.error('Error remove product:', error.message);
                    return false;
                }
        
                return true;
            } catch (e: any) {
                console.error('Error remove product:', e.message);
                return false;
            }
        },
        getListItemsById: async function(id: string) {
            try {
                const { data, error } = await client.from('wish_list').select('*').eq('user_id', id);

                if (error) {
                    console.error('Error fetching products:', error.message);
                    return;
                }

                return data as ICard[];
            } catch (e: any) {
                console.error('Error fetching products:', e.message);
            }
        },
    };

    return {
        users,
        items,
        storage,
        client,
    }
};
