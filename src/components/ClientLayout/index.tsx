"use client";

import { Varela_Round } from "next/font/google";
import "@/assets/styles/globals.scss";
import "@/assets/styles/tiptap.scss";
import LayoutWrapper from "@/components/LayoutWrapper/index";
import { GoogleAuthProvider } from "@/context/GoogleAuthContext";

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={varelaRound.className}>
      <GoogleAuthProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </GoogleAuthProvider>
    </div>
  );
}
