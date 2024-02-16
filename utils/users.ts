import { UserMetadata } from "@/supabase/types";

export const getDisplayName = (user: UserMetadata) => {
    if(user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
  
    return user.login;
}