import { UserMetadata } from "@/supabase/types";
import Avatar from "./Avatar";

type Props = {
    userMeta: UserMetadata,
}

export default function UserCard(props: Props) {
    const { userMeta } = props;
    const displayName = (userMeta.first_name ?? '') + (userMeta.last_name ?? '');

    return(
        <div className="flex flex-col gap-6 justify-center items-center p-4 bg-neutral-200 rounded-lg">
            <span className="font-bold text-4xl">{userMeta.login}</span>
            
            { displayName &&
                <div className="flex justify-center items-center gap-4">
                    {displayName && <Avatar name={userMeta.first_name + ' ' + userMeta.last_name} size='large'/>}
                    <span className="text-2xl">{userMeta.first_name + ' ' + userMeta.last_name}</span>
                </div> }
        </div>
    );
}
