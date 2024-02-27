'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import {
  Avatar, AvatarIcon, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger,
} from '@nextui-org/react';
import ArrowLeftStartOnRectangleIcon from '@heroicons/react/24/outline/ArrowLeftStartOnRectangleIcon';
import ListBulletIcon from '@heroicons/react/24/outline/ListBulletIcon';

import { createClient } from '@/supabase/client';
import { IUser } from '@/supabase/types';

type Props = {
  user: IUser
}

export default function AuthButton(props: Props) {
  const { user } = props;

  const logOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/');
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          icon={<AvatarIcon />}
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection
          title="Navigation"
          showDivider
        >
          <DropdownItem
            key="wishlist"
            href={`/list/${user.login}`}
            as={Link}
            startContent={<ListBulletIcon height={20} />}
          >
            WishList
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="logout"
            onClick={logOut}
            className="text-danger"
            color="danger"
            value="Log Out"
            startContent={<ArrowLeftStartOnRectangleIcon height={20} />}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
