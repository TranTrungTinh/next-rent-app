import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from '@/app/components/layout/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modal/RegisterModal';
import ToastProvider from './components/Toast';
import LoginModal from './components/modal/LoginModal';
import { getCurrentUser } from './actions/getCurrentUser';
import RentModal from './components/modal/RentModal';

export const metadata = {
  title: 'Next Rent App',
  description: 'Next Rent App',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <ToastProvider />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}