'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import ConfigProvider from 'antd/es/config-provider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NextAuthSessionProvider from '@/app/providers/sessionProvider';
// import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] });

const themeConfig = {
  token: {
    colorPrimary: '#04ab6b',
    colorPrimaryBg: '#d3ebde',
    colorPrimaryBgHover: '#92deb7',
    colorPrimaryBorder: '#69d19f',
    colorPrimaryBorderHover: '#43c48a',
    colorPrimaryHover: '#21b879',
    colorPrimaryActive: '#008556',
    colorPrimaryTextHover: '#21b879',
    colorPrimaryText: '#04ab6b',
    colorPrimaryTextActive: '#008556',
  },
};

interface IProps {
  children: React.ReactNode;
  // session: any
}

const queryClient = new QueryClient();

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={themeConfig}>
            <body className={inter.className}>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </body>
          </ConfigProvider>
        </QueryClientProvider>
      </NextAuthSessionProvider>
    </html>
  );
}
