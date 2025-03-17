import "@/assets/styles/globals.scss";
import "@/assets/styles/tiptap.scss";
import { Varela_Round } from "next/font/google";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import { GoogleAuthProvider } from "@/context/GoogleAuthContext";
import LayoutWrapper from "@/components/LayoutWrapper/index";

export const metadata = {
  title: "Edward Chang's Blog",
  description: "A frontend engineer's personal blog.",
  openGraph: {
    type: "website",
    url: "https://edwardchang.blog/blog/",
    title: "Edward Chang's Blog",
    description: "A frontend engineer's personal blog.",
    images: [
      {
        url: "https://i.meee.com.tw/mIidscN.png",
        width: 520,
        height: 520,
        alt: "My Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edward Chang's Blog",
    description: "A frontend engineer's personal blog.",
    images: ["https://i.meee.com.tw/mIidscN.png"],
  },
  icons: {
    icon: "https://i.meee.com.tw/mIidscN.png",
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
