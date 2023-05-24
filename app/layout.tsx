import { Nunito } from 'next/font/google'

import Navbar from '@/app/components/layout/Navbar';
import './globals.css'

export const metadata = {
  title: 'Next Rent App',
  description: 'Next Rent App',
}

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}