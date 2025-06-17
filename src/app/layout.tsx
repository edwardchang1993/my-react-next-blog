import "@/assets/styles/globals.scss";
import "@/assets/styles/tiptap.scss";
import { Varela_Round } from "next/font/google";
import { StyledComponentsRegistry } from "@/components";
import { GoogleAuthProvider } from "@/context/GoogleAuthContext";
import { LayoutWrapper } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edward Chang's Blog",
  description: "A frontend engineer's personal blog.",
  keywords: ["Edward", "frontend", "web", "engineer", "blog"],
  authors: [
    {
      name: "Edward",
    },
  ],
  creator: "Edward Chang",
  publisher: "",
  applicationName: "React Next Blog",
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: "origin-when-cross-origin",
  category: "blog",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://edwardchang.blog/blog/",
    title: "Edward's Blog",
    siteName: "Edward's Blog",
    description: "A frontend engineer's personal blog.",
    images: [
      {
        url: "https://i.meee.com.tw/mIidscN.png",
        width: 520,
        height: 520,
        alt: "Edward's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edward's Blog",
    description: "A frontend engineer's personal blog.",
    images: ["https://i.meee.com.tw/mIidscN.png"],
  },
  icons: {
    icon: "https://i.meee.com.tw/mIidscN.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
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
        <StyledComponentsRegistry>
          <GoogleAuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </GoogleAuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
