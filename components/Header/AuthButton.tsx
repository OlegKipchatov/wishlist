'use client'

import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/supabase/client";
import { IUser } from "@/supabase/types";
import { AvatarIcon, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Avatar } from "@nextui-org/react";
import ListBulletIcon from '@heroicons/react/24/outline/ListBulletIcon';
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import ArrowLeftStartOnRectangleIcon from "@heroicons/react/24/outline/ArrowLeftStartOnRectangleIcon";

type Props = {
  user: IUser
}

export default function AuthButton(props: Props) {
  const { user } = props;

  const logOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          icon={<AvatarIcon />}
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection title='Navigation' showDivider>
          <DropdownItem key='wishlist' href={`/list/${user.login}`} as={Link} startContent={<ListBulletIcon height={20}/>}>
            WishList
          </DropdownItem>
          <DropdownItem key='settings' href={`/settings`} as={Link} startContent={<Cog6ToothIcon height={20}/>}>
            Settings
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title='Danger zone'>
          <DropdownItem key='logout'
            onClick={logOut}
            className="text-danger"
            color="danger"
            value='Log Out'
            startContent={<ArrowLeftStartOnRectangleIcon height={20}/>}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
