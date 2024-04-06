'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import ConfigProvider from 'antd/es/config-provider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NextAuthSessionProvider from '@/app/providers/sessionProvider';
import React from 'react';
import Parse from "parse";

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
  components: {
    Modal: {
      /* here is your component tokens */
      // headerBg: '#04ab6b',
      // footerBg: '#04ab6b',
      // contentBg: '#fff1',
    },
  },
};

interface IProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

 // let serverURL2 = `https://jubilee.plot411.com/parse`;
 let serverURL2 = `http://localhost:3011/parse`;
 var keyApplicationId = "debunkbot";
 var keyParseServerKey = "debunkbot12@!!";


 (Parse as any).serverURL = serverURL2;
 // console.log('host', host, serverURL)
 Parse.initialize(keyApplicationId, keyParseServerKey)
 // Parse.enableLocalDatastore()


export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={themeConfig}>
            <React.StrictMode>
              <body className={inter.className}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
              </body>
            </React.StrictMode>
          </ConfigProvider>
        </QueryClientProvider>
      </NextAuthSessionProvider>
    </html>
  );
}
