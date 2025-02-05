import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "@/assets/styles/globals.scss";
import "@/assets/styles/tiptap.scss";
import LayoutWrapper from "@/components/LayoutWrapper/index";
import { GoogleAuthProvider } from "@/context/GoogleAuthContext";

export const metadata: Metadata = {
  title: "Edward Chang's Blog",
  description: "A Frontend Engineer",
  alternates: {
    canonical: "https://edwardchang.blog/",
  },
};

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={varelaRound.className}>
        <GoogleAuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
