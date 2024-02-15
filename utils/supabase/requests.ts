import { SupabaseClient } from "@supabase/supabase-js";

export const isAuthUser = async (supabase: SupabaseClient) => {
    const { data: { user } } = await supabase.auth.getUser();

    return user != null;
}

export const getUserData = async (supabase: SupabaseClient) => {
    const { data: { session } } = await supabase.auth.getSession()

    return session?.user;
}

export const setUserMetadata = async (supabase: SupabaseClient, userMetada: UserMetadata) => {
    const user = await getUserData(supabase);
    const uuid = user?.id;

    try {
        const { error } = await supabase
            .from('profiles')
            .insert({...userMetada, id: uuid});

        if (error) {
            console.error('Error fetching products:', error.message);
            return;
        }
    } catch (e: any) {
        console.error('Error fetching products:', e.message);
    }
}

export const updateUserMetadata = async (supabase: SupabaseClient, userMetada: UserMetadata) => {
    const user = await getUserData(supabase);
    const uuid = user?.id;

    try {
        const { error } = await supabase
            .from('profiles')
            .update(userMetada)
            .eq('id', uuid)

        if (error) {
            console.error('Error fetching products:', error.message);
            return;
        }
    } catch (e: any) {
        console.error('Error fetching products:', e.message);
    }
}

export const getUserMetadata = async (supabase: SupabaseClient) => {
    const user = await getUserData(supabase);
    const uuid = user?.id;

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', uuid);

        if (error) {
            console.error('Error fetching products:', error.message);
            return;
        }

        return data[0] as UserMetadata;
    } catch (e: any) {
        console.error('Error fetching products:', e.message);
    }
}

export const getListItem = async (supabase: SupabaseClient): Promise<IItem[] | undefined> => {
    const user = await getUserData(supabase);
    const uuid = user?.id;

    try {
        const { data, error } = await supabase
            .from('wish_list')
            .select('*')
            .eq('user_id', uuid);

        if (error) {
            console.error('Error fetching products:', error.message);
            return;
        }

        return data;
    } catch (e: any) {
        console.error('Error fetching products:', e.message);
    }
}

export const setItem = async (supabase: SupabaseClient, item: WishItem): Promise<Boolean> => {
    const newItem: WishItemRequest = {
        title: item.title,
        cost: item.cost,
        link: item.link,
        time: item.time,
        image: item.image?.name
    };

    try {
        if(item.image) {
            const { data: imgData, error: errorImage } = await supabase.storage
                .from('images')
                .upload(item.image.name, item.image);

            if (errorImage) {
                console.error('Error upload image:', errorImage.message);
                return false;
            }

            console.log(imgData.path);
        }

        const { error } = await supabase
            .from('wish_list')
            .insert(newItem);

        if (error) {
            console.error('Error set products:', error.message);
            return false;
        }

        return true;
    } catch (e: any) {
        console.error('Error set products:', e.message);
        return false;
    }
}

export const removeItem = async (supabase: SupabaseClient, uuid: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('wish_list')
            .delete()
            .eq('id', uuid);

        if (error) {
            console.error('Error remove products:', error.message);
            return false;
        }

        return true;
    } catch (e: any) {
        console.error('Error remove products:', e.message);
        return false;
    }
    
}

export interface IItem {
    id: string,
    user_id: string,
    title: string,
    cost: number | undefined,
    link: string | undefined,
    time: string,
    image: string | undefined,
}

export type WishItem = Omit<IItem, 'id' | 'image'> & {
    image: File | undefined,
};

type WishItemRequest = Omit<IItem, 'id'>;

export interface UserMetadata {
    login?: string,
    first_name?: string,
    last_name?: string,
};
