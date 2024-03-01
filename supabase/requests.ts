/* eslint-disable no-console */
import {
  Card, ICard, IUser, UserMetadata,
} from './types';

import { SupabaseClient } from '@supabase/supabase-js';

type GetUserMetadataProps = {
    id?: string,
    login?: string,
}

export const supabaseWorker = (client: SupabaseClient) => {
  const users = {
    async isEmailExist(email: string) {
      const { data } = await client.from('profiles').select('email').eq('email', email);
      return data?.length === 0;
    },
    async isLoginExist(login: string) {
      const { data } = await client.from('profiles').select('login').eq('login', login);
      return data?.length === 0;
    },
    async getSessionUser() {
      const { data: { session } } = await client.auth.getSession();
      if (!session?.user) {
        return undefined;
      }

      const user = {
        id: session.user.id,
        email: session.user.email,
        ...session.user.user_metadata,
      } as IUser;
      return user;
    },
    async isAuthenticated() {
      const { data: { user } } = await client.auth.getUser();
      return !!user;
    },
    async getUserByIdOrLogin({ id, login }: GetUserMetadataProps) {
      const eqObj = id ? { column: 'id', value: id } : { column: 'login', value: login };

      try {
        const { data, error } = await client.from('profiles').select<any, IUser>('*').eq(eqObj.column, eqObj.value);

        if (error) {
          console.error('Error fetching user metadata:', error.message);
          return undefined;
        }

        return data[0];
      } catch (e: any) {
        console.error('Error fetching user metadata:', e.message);
        return undefined;
      }
    },
    async updateUserMetadata(userMetadata: UserMetadata) {
      try {
        const { error } = await client.auth.updateUser({
          data: userMetadata,
        });

        if (error) {
          console.error('Error update user metadata for auth.user', error.message);
        }
      } catch (e: any) {
        console.error('Error update user metadata', e.message);
      }
    },
  };

  const storage = {
    async getPublicCardImageUrl(imageName: string, userId: string | undefined = undefined) {
      const uid = userId ?? (await users.getSessionUser())?.id;
      const { data: { publicUrl } } = client.storage.from('images').getPublicUrl(`${uid}/${imageName}`);
      return publicUrl;
    },
    async uploadCardImage(image: File) {
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
    async removeCardImage(imageName: string) {
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
    async setItem(item: Card) {
      try {
        const { data, error } = await client
          .from('wish_list')
          .insert({ ...item, image: item.image?.name })
          .select<any, ICard>();

        if (item.image) {
          await storage.uploadCardImage(item.image);
        }

        if (error) {
          console.error('Error set product:', error.message);
          return undefined;
        }

        return data[0];
      } catch (e: any) {
        console.error('Error set product:', e.message);
        return undefined;
      }
    },
    async updateItem(oldCard: ICard, newCard: Card) {
      try {
        const { data, error } = await client
          .from('wish_list')
          .update({ ...newCard, image: newCard.image?.name })
          .eq('id', oldCard.id)
          .select<any, ICard>();

        if (newCard.image) {
          await storage.uploadCardImage(newCard.image);
        }

        if (oldCard.image) {
          storage.removeCardImage(oldCard.image);
        }

        if (error) {
          console.error('Error set product:', error.message);
          return undefined;
        }

        return data[0];
      } catch (e: any) {
        console.error('Error set product:', e.message);
        return undefined;
      }
    },
    async removeItem(card: ICard) {
      try {
        const { error } = await client.from('wish_list').delete().eq('id', card.id);
        if (card.image) {
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
    async getListItemsById(id: string) {
      try {
        const { data, error } = await client.from('wish_list').select<any, ICard>('*').eq('user_id', id);

        if (error) {
          console.error('Error fetching products:', error.message);
          return [];
        }

        return data ?? [];
      } catch (e: any) {
        console.error('Error fetching products:', e.message);
        return [];
      }
    },
  };

  return {
    users,
    items,
    storage,
    client,
  };
};
