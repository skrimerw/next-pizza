import type { Metadata } from "next";
import { Cart, Header } from "@/components/shared";

export const metadata: Metadata = {
    openGraph: {
        type: "website",
        siteName: "Next Pizza",
    },
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main>{children}</main>

            {/* Корзина для мобильных устройств */}
            <Cart className="sm:hidden fixed bottom-5 right-5 rounded-full h-12 w-12" />
        </>
    );
}
