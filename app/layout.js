import { Barlow, Bebas_Neue, Share_Tech_Mono } from 'next/font/google';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-barlow',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-share-tech-mono',
});

export const metadata = {
  title: 'Timer',
  description: 'Production-ready countdown timer built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${barlow.variable} ${bebasNeue.variable} ${shareTechMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
