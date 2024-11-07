// app/layout.tsx
"use client"

import Layout from '@/components/Layout/Layout'
import { Providers } from './providers'
import { RecoilRoot } from "recoil";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
      <RecoilRoot>
        <Providers>
          <Layout>
              {children}
          </Layout>
        </Providers>
      </RecoilRoot>
      </body>
    </html>
  )
}