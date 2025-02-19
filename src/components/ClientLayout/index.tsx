"use client";

import "@/assets/styles/globals.scss";
import "@/assets/styles/tiptap.scss";
import { Suspense } from "react";
import LayoutWrapper from "@/components/LayoutWrapper/index";
import { GoogleAuthProvider } from "@/context/GoogleAuthContext";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleAuthProvider>
      <LayoutWrapper>
        <Suspense>{children}</Suspense>
      </LayoutWrapper>
    </GoogleAuthProvider>
  );
}
