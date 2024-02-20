import { GeistSans } from "geist/font/sans";
import Header from "@/components/Header";
import "./globals.css";
import { cookies } from "next/headers";
import { getTheme } from "@/utils/themes/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "WishList",
  description: "Make a wishlist and share it with friends and family!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeMode = getTheme(cookies());
  return (
    <html lang="en" className={GeistSans.className + ' ' + themeMode}>
      <body className="bg-gray-0 text-gray-800">
        <Header />
        <main className="min-h-screen flex flex-col items-center pt-16">
          <div className="w-full max-w-2xl p-6">
            {children}
          </div>
          <footer className="w-full border-t border-t-gray-200 p-8 flex justify-center text-center text-xs">
            <p>
              Powered by{" "}
              <a
                href="https://vk.com/jarponok"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                trueHack
              </a>
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
