import {
  Avatar, AvatarIcon, Card, CardBody, CardHeader, User,
} from '@nextui-org/react';

import { IUser } from '@/supabase/types';
import { getDisplayName } from '@/utils/users';

import CopyUser from './CopyUserInfo';

type Props = {
    user: IUser,
}

export default function UserCard(props: Props) {
  const { user } = props;

  const displayName = getDisplayName(user);

  return (
    <Card className="max-w-96 w-full sm:max-w-full">
      <CardHeader className="relative h-24 bg-gradient-to-r from-[#09cd00] via-80% via-[#9214af] to-[#770391]">
        <Avatar
          icon={<AvatarIcon />}
          classNames={{
            base: 'w-24 h-24 absolute -bottom-12 m-auto left-0 right-0',
            icon: 'text-black/80',
          }}
        />
      </CardHeader>
      <CardBody className="mt-12">
        <User
          name={displayName}
          classNames={{
            base: 'self-start',
            name: 'text-2xl',
          }}
          avatarProps={{ className: 'hidden' }}
          description={(
            <div className="flex gap-1 items-center">
              <span className="text-xl">
                @
                {user.login}
              </span>
              <CopyUser login={user.login} />
            </div>
          )}
        />
      </CardBody>
    </Card>
  );
}
