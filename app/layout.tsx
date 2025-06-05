import AppContextProvider from "@/contexts/AppContextProvider";
import { Nunito } from "next/font/google";
import "./globals.css";
//import { cookies } from "next/headers";
//import { prisma } from "@/prisma/prisma-client";

//const crypto = require("crypto");

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
    //console.log(((await cookies()).get("cart-token")))
    return (
        <html lang="en">
            <body
                /* onLoad={async () => {
                    "use server";

                    
                    const cookieStore = await cookies();
                    
                    if (cookieStore.has("cart-token")) return;

                    const token = crypto.randomBytes(32).toString("hex");

                    cookieStore.set({
                        name: "cart-token",
                        value: token,
                        httpOnly: true,
                        maxAge: 60,
                    });

                    await prisma.cart.create({
                        data: {
                            token,
                        }
                    })
                }} */
                className={`${nunito.className} antialiased`}
            >
                <AppContextProvider>{children}</AppContextProvider>
            </body>
        </html>
    );
}
