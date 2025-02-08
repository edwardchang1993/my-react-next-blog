import ClientLayout from "@/components/ClientLayout";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
