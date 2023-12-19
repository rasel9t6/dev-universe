import RightSidebar from '@/components/shared/RightSidebar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Navbar from '@/components/shared/navbar/Navbar';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Tags | Dev Universe',
  icons: { icon: '/assets/images/site-logo.svg' },
  openGraph: {
    type: 'website',
    url: 'https://dev-universe.vercel.app',
    title: 'Dev Universe - Empowering Developers to Collaborate and Innovate',
    description:
      'Join Dev Universe, the vibrant hub where developers collaborate, learn, and innovate! Explore a supportive community, ask and answer programming questions, harness the power of AI, vote for excellence, save valuable insights, and stay informed and inspired. Your journey to coding excellence begins here in the universe of endless possibilities!',
    siteName: 'Dev Universe',
    images: [
      {
        url: '/app/meta-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Universe - Empowering Developers to Collaborate and Innovate',
    description:
      'Join Dev Universe, the vibrant hub where developers collaborate, learn, and innovate! Explore a supportive community, ask and answer programming questions, harness the power of AI, vote for excellence, save valuable insights, and stay informed and inspired. Your journey to coding excellence begins here in the universe of endless possibilities!',
    site: '@Dev Universe',
    creator: '@Dev Universe',
    images: '/app/meta-image.png',
  },
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=' background-light850_dark100 relative '>
      <Navbar />
      <div className='flex'>
        <LeftSidebar />
        <section className='flex min-h-screen flex-1 flex-col px-6 pt-36 max-md:pb-14 sm:px-14'>
          <div className='mx-auto w-full'>{children}</div>
        </section>
        <RightSidebar />
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
