"use client";

import "@/assets/styles/globals.scss";
import "@/assets/styles/tiptap.scss";
import LayoutWrapper from "@/components/LayoutWrapper/index";
import { GoogleAuthProvider } from "@/context/GoogleAuthContext";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleAuthProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </GoogleAuthProvider>
  );
}
