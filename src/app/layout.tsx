'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import ConfigProvider from 'antd/es/config-provider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NextAuthSessionProvider from '@/app/providers/sessionProvider';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

// Move queryClient outside component to prevent recreation on renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextAuthSessionProvider>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider
              theme={{
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
                }
              }}
            >
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </ConfigProvider>
          </QueryClientProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
