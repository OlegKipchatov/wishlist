import { GeistSans } from "geist/font/sans";
import Header from "@/components/Header";
import { scriptSetThemeMode } from "@/utils/themes/middleware";
import "./globals.css";

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
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-neutral-0 text-neutral-900">
        <script id='set-theme-mode' dangerouslySetInnerHTML={{ __html: scriptSetThemeMode }}></script>
        <Header />
        <main className="min-h-screen flex flex-col items-center pt-16">
          <div className="w-full max-w-2xl p-6">
            {children}
          </div>
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
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
