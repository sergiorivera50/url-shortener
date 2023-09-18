import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'URL Shortener',
  description: 'Shorten any URL in a matter of seconds through an accessible UI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>{children}</body>
    </html>
  );
}
