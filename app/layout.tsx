import { NextFont } from 'next/dist/compiled/@next/font';
import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import ReactQueryProvider from '../components/ReactQueryProvider';

const inter: NextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'URL Shortener',
  description: 'Shorten any URL in a matter of seconds through an accessible UI.',
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en">
      <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
