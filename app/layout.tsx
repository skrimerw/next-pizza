import AppContextProvider from "@/contexts/AppContextProvider";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="text-sm md:text-base">
      <body className={`${nunito.className} antialiased`}>
        <SessionProvider session={session}>
          <Toaster richColors />
          <AppContextProvider>{children}</AppContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
