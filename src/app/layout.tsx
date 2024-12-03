import type { Metadata } from "next";
import '@/assets/styles/globals.css'

export const metadata: Metadata = {
  title: "Edward Chang's Blog",
  description: "A Frontend Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
