import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
// eslint-disable-next-line
import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import '../styles/globals.css';
import '../styles/prism.css';
import { ThemeProvider } from '@/context/ThemeProvider';
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk',
});
export const metadata: Metadata = {
  title: 'Dev Universe - Empowering Developers to Collaborate and Innovate',
  description:
    'Join Dev Universe, the vibrant hub where developers collaborate, learn, and innovate! Explore a supportive community, ask and answer programming questions, harness the power of AI, vote for excellence, save valuable insights, and stay informed and inspired. Your journey to coding excellence begins here in the universe of endless possibilities!',
  icons: { icon: '/assets/images/site-logo.svg' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <meta
          itemProp='name'
          content='Dev Universe - Empowering Developers to Collaborate and Innovate'
        />
        <meta
          itemProp='description'
          content='Join Dev Universe, the vibrant hub where developers collaborate, learn, and innovate! Explore a supportive community, ask and answer programming questions, harness the power of AI, vote for excellence, save valuable insights, and stay informed and inspired. Your journey to coding excellence begins here in the universe of endless possibilities!'
        />

        {/* Facebook Meta Tags */}
        <meta
          property='og:url'
          content='https://dev-universe.vercel.app'
        />
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:title'
          content='Dev Universe - Empowering Developers to Collaborate and Innovate'
        />
        <meta
          property='og:description'
          content='Join Dev Universe, the vibrant hub where developers collaborate, learn, and innovate! Explore a supportive community, ask and answer programming questions, harness the power of AI, vote for excellence, save valuable insights, and stay informed and inspired. Your journey to coding excellence begins here in the universe of endless possibilities!'
        />
        <meta
          property='og:image'
          content='/app/meta-image.png'
        />
        {/* Twitter Meta Tags */}
        <meta
          name='twitter:card'
          content='summary_large_image'
        />
        <meta
          name='twitter:title'
          content='Dev Universe - Empowering Developers to Collaborate and Innovate'
        />
        <meta
          name='twitter:description'
          content='Join Dev Universe, the vibrant hub where developers collaborate, learn, and innovate! Explore a supportive community, ask and answer programming questions, harness the power of AI, vote for excellence, save valuable insights, and stay informed and inspired. Your journey to coding excellence begins here in the universe of endless possibilities!'
        />
        <meta
          property='twitter:image'
          content='/app/meta-image.png'
        />
        {/* Additional meta tags */}
        <meta
          name='keywords'
          content='developers, community, programming, web development, mobile app development, algorithms, data structures'
        />
        <meta
          name='author'
          content='Dev Universe'
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover:text-primary-500',
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
