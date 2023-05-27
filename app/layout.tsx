import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from '@/app/components/layout/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modal/RegisterModal';
import ToastProvider from './components/Toast';

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
        <ClientOnly>
          <RegisterModal />
          <Navbar />
          <ToastProvider />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}