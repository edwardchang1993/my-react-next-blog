import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import '@/assets/styles/globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata: Metadata = {
  title: "Edward Chang's Blog",
  description: "A Frontend Engineer",
};

const varelaRound = Varela_Round({
  weight: '400', // Adjust weight if necessary
  subsets: ['latin'], // Include the required subsets (e.g., 'latin')
  display: 'swap', // Optional, ensures better font rendering
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={varelaRound.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
