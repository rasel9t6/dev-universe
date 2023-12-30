import React from 'react';
import Question from '@/components/forms/Question';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.action';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Ask question | Dev Universe',
  icons: { icon: '/assets/images/site-logo.svg' },
  openGraph: {
    type: 'website',
    url: 'https://dev-universe.vercel.app/ask-question',
    title: 'Dev Universe - Empowering Developers to Collaborate and Innovate',
    description:
      'Join Dev Universe, the vibrant hub where developers collaborate, learn, and innovate! Explore a supportive community, ask and answer programming questions, harness the power of AI, vote for excellence, save valuable insights, and stay informed and inspired. Your journey to coding excellence begins here in the universe of endless possibilities!',
    siteName: 'Dev Universe',
    images: [
      {
        url: './app/meta-image.png', // Provide the absolute URL
        alt: 'Dev Universe Meta Image', // Include an alt attribute
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Universe - Empowering Developers to Collaborate and Innovate',
    description:
      'Join Dev Universe, the vibrant hub where developers collaborate, learn, and innovate! Explore a supportive community, ask and answer programming questions, harness the power of AI, vote for excellence, save valuable insights, and stay informed and inspired. Your journey to coding excellence begins here in the universe of endless possibilities!',
    site: '@DevUniverse',
    creator: '@DevUniverse',
    images: {
      url: './app/meta-image.png',
      alt: 'Dev Universe Twitter Image',
    },
  },
};
const Page = async () => {
  const { userId } = auth();


  if (!userId) redirect('/sign-in');
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Ask a question</h1>
      <div className='mt-9'>
        <Question mongoUserId={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default Page;
