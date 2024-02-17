export interface IUser {
    id: string,
    email: string,
    login: string,
    first_name?: string,
    last_name?: string,
}

export type UserMetadata = Omit<IUser, 'id' | 'email'>;
  
export interface ICard {
    id: string,
    time: string,
    title: string,
    cost?: number,
    link?: string,
    image?: string,
}

export type Card = Omit<ICard, 'id' | 'image'> & {
    image?: File,
};
