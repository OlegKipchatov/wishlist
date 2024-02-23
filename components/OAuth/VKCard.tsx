import { PayloadVK } from "@/utils/oauth/vk";

type Props = {
    user: PayloadVK['user'],
}

export default function VKCard(props: Props) {
    const { user } = props;

    return (
        <div className="flex gap-4 items-center justify-center bg-gray-100 rounded-lg p-8">
            <img src={user.avatar} className="w-20 rounded-full"></img>
            <span className="font-bold text-2xl">{user.first_name} {user.last_name}</span>
        </div>
    );
}