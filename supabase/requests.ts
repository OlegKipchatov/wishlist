import { SupabaseClient } from "@supabase/supabase-js";
import { Card, ICard, IUser, UserMetadata } from "./types";

type GetUserMetadataProps = {
    id?: string,
    login?: string,
}

export const supabaseWorker = (client: SupabaseClient) => {
    return {
        users: {
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
            getListUsers: async function() {
                try {
                    const { data, error } = await client.from('profiles').select('*');
            
                    if (error) {
                        console.error('Error fetching list users:', error.message);
                        return;
                    }
                    return data as UserMetadata[];
                } catch (e: any) {
                    console.error('Error fetching list users:', e.message);
                }
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
        },
        items: {
            setItem: async function(item: Card) {
                const newItem: any = {
                    title: item.title,
                    cost: item.cost,
                    link: item.link,
                    time: item.time,
                    image: item.image?.name
                };
            
                try {
                    if(item.image) {
                        const { error: errorImage } = await client.storage
                            .from('images')
                            .upload(item.image.name, item.image);
            
                        if (errorImage) {
                            console.error('Error upload image:', errorImage.message);
                            return false;
                        }
                    }
            
                    const { error } = await client.from('wish_list').insert({...item, image: item.image?.name});
            
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
            removeItem: async function(cardId: string) {
                try {
                    const { error } = await client.from('wish_list').delete().eq('id', cardId);
            
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
            }
        }
    }
}
