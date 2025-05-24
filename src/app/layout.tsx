import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '@/app/components/common/footer';
import Navbar from '@/app/components/common/navbar';
import { useUserStore } from './store';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// const user = useUserStore((state: { user: any }) => state.user);

export const metadata: Metadata = {
  title: 'Chennai Cyclists',
  description: "Chennai cyclist's rider website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
