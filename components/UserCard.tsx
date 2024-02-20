import { IUser } from "@/supabase/types";
import Avatar from "./Avatar";

type Props = {
    user: IUser,
}

export default function UserCard(props: Props) {
    const { user } = props;

    return(
        <div className="flex gap-2 justify-center items-center p-4 rounded-lg">
            <Avatar />
            <div className="flex flex-col">
                <span className="text-4xl">{user.first_name + ' ' + user.last_name}</span>
                <span className="font-bold text-2xl">{user.login}</span>
            </div>
        </div>
    );
}
