'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import ConfigProvider from 'antd/es/config-provider';

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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ConfigProvider theme={themeConfig}>
        <body className={inter.className}>{children}</body>
      </ConfigProvider>
    </html>
  );
}
