'use client'

import { Fragment } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/supabase/client";
import { IUser } from "@/supabase/types";
import { getDisplayName } from "@/utils/users";
import { Menu, Transition } from '@headlessui/react';
import ListBulletIcon from '@heroicons/react/24/outline/ListBulletIcon';
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import ArrowLeftStartOnRectangleIcon from "@heroicons/react/24/outline/ArrowLeftStartOnRectangleIcon";

type Props = {
  user: IUser
}

export default function AuthButton(props: Props) {
  const { user } = props;
  const displayName = getDisplayName(user);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <Menu as="div" className="relative flex flex-row-reverse text-left">
      <Menu.Button className="py-2 px-3 flex rounded-md no-underline btn-focus bg-gray-100 hover:bg-gray-200 active:bg-gray-300">{displayName}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute self-end top-9 z-10 rounded-lg shadow-2xl w-36 bg-gray-100">
          <div className="py-2 text-sm">
            <Menu.Item>
              <Link href={`/list/${user.login}`} className="inline-flex w-full px-4 py-2 text-sm hover:bg-gray-200 active:bg-gray-300">
                <ListBulletIcon width={24} height={24} />
                WishList
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/settings" className="inline-flex w-full px-4 py-2 text-sm hover:bg-gray-200 active:bg-gray-300">
                <Cog6ToothIcon width={24} height={24} />
                Settings
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button onClick={signOut} className="inline-flex w-full px-4 py-2 text-sm hover:bg-gray-200 active:bg-gray-300">
                <ArrowLeftStartOnRectangleIcon width={24} height={24} />
                Logout
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
