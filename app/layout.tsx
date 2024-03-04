import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { Divider } from '@nextui-org/react';

import { getTheme } from '@/utils/themes/server';
import Header from '@/components/Header';
import SessionUserStore from '@/components/SessionUserStore';

import './globals.css';

import { GeistSans } from 'geist/font/sans';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'WishList',
  description: 'Make a wishlist and share it with friends and family!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeMode = getTheme(cookies());
  return (
    <html
      lang="en"
      className={`${GeistSans.className} ${themeMode}`}
    >
      <body className="bg-background text-foreground">
        <SessionUserStore />
        <Header />
        <main className="min-h-full flex flex-col items-center">
          <div className="w-full max-w-2xl p-6">
            {children}
          </div>
          <footer className="w-full p-8 flex flex-col gap-4 justify-center text-center text-xs">
            <Divider className="w-full" />
            <p className="text-default-500">
              Powered by
              {' '}
              <Link
                href="https://vk.com/jarponok"
                target="_blank"
                className="font-bold hover:underline text-foreground"
                rel="noreferrer"
              >
                trueHack
              </Link>
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
