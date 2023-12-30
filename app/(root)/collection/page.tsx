import QuestionCard from '@/components/cards/QuestionCard';

import Filter from '@/components/shared/Filter';
import Noresult from '@/components/shared/Noresult';
import Pagination from '@/components/shared/Pagination';
import { QuestionFilters } from '@/constants/filters';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { getSavedQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Collections | Dev Universe',
  icons: { icon: '/assets/images/site-logo.svg' },
  openGraph: {
    type: 'website',
    url: 'https://dev-universe.vercel.app/collection',
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
export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Saved Questions</h1>

      <div className='mt-11 flex flex-col justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchbar
          route='/collection'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherClasses='flex-1 w-full'
        />

        <Filter
          filters={QuestionFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>
      <div className='mt-10 flex w-full flex-col gap-6'>
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <Noresult
            title="There's no question saved to show"
            description='Be the frist to break the silence! 🚀 Ask a Question and kickstart thte
        disscussion. Our quary could be the next big thing others learn from.
        Get involved! 💡'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>
      <div className='mt-10'>
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
