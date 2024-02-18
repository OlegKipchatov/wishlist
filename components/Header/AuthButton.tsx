'use client'

import { Fragment } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/supabase/client";
import { IUser } from "@/supabase/types";
import { getDisplayName } from "@/utils/users";
import { Menu, Transition } from '@headlessui/react';
import ListSvg from '@/svg/List';
import SettingsSvg from "@/svg/Settings";
import LogoutSvg from "@/svg/Logout";

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
      <Menu.Button className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">{displayName}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute self-end top-10 z-10 bg-white divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700">
          <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <Menu.Item>
              <Link  href={`/list/${user.login}`} className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                <ListSvg />
                WishList
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/settings" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                <SettingsSvg />
                Settings
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button onClick={signOut} className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                <LogoutSvg />
                Logout
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
