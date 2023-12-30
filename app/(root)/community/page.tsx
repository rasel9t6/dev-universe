import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/shared/Filter';
import Pagination from '@/components/shared/Pagination';
import { UserFilters } from '@/constants/filters';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { getAllUsers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Community | Dev Universe',
  icons: { icon: '/assets/images/site-logo.svg' },
  openGraph: {
    type: 'website',
    url: 'https://dev-universe.vercel.app/community',
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
const page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>All Users</h1>
      <div className='mt-11 flex flex-col justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchbar
          route='/community'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for amazing minds'
          otherClasses='flex-1 w-full'
        />

        <Filter
          filters={UserFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>
      <section className='mt-12 flex flex-wrap gap-4'>
        {result.users.length > 0 ? (
          result.users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
            />
          ))
        ) : (
          <div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
            <p>No users yet!</p>

            <Link
              href='/sign-up'
              className='mt-1 font-bold text-accent-blue'
            >
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
      <div className='mt-10'>
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default page;
