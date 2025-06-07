import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { BookmarksProvider } from '@/contexts/bookmarks-context';

import { getCharacters } from '@/services/api/actions';
import { OPERATION_STATUS } from '@/services/api/consts';

import { AppLayoutTemplate } from '@/components/templates/app-layout-template';

import './globals.css';

const greycliffCF = localFont({
  src: [
    {
      path: './fonts/Greycliff_CF_Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Greycliff_CF_Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Greycliff_CF_Semi_Bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Greycliff_CF_Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-greycliff',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rick and Morty List',
  description: 'Explore characters from the Rick and Morty universe',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await getCharacters(1);

  const characters =
    response.status === OPERATION_STATUS.SUCCESS ? response.data : [];

  return (
    <html lang="en">
      <body className={`${greycliffCF.variable} antialiased`}>
        <BookmarksProvider>
          <AppLayoutTemplate characters={characters}>
            {children}
          </AppLayoutTemplate>
        </BookmarksProvider>
      </body>
    </html>
  );
}
