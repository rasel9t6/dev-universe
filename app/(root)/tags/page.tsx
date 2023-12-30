import Filter from '@/components/shared/Filter';
import Noresult from '@/components/shared/Noresult';
import Pagination from '@/components/shared/Pagination';
import { TagFilters } from '@/constants/filters';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { getAllTags } from '@/lib/actions/tag.actions';
import { SearchParamsProps } from '@/types';
import Link from 'next/link';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Tags | Dev Universe',
  icons: { icon: '/assets/images/site-logo.svg' },
  openGraph: {
    type: 'website',
    url: 'https://dev-universe.vercel.app/tags',
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
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>All Tags</h1>
      <div className='mt-11 flex flex-col justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchbar
          route='/tags'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for tags'
          otherClasses='flex-1 w-full'
        />

        <Filter
          filters={TagFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>
      <section className='mt-12 flex flex-wrap gap-4'>
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
            >
              <article className='background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]'>
                <div className='background-light800_dark400 w-fit rounded-sm px-5 py-1.5'>
                  <p className='paragraph-semibold text-dark300_light900'>
                    {tag.name}
                  </p>
                </div>
                <div>
                  <p className='small-medium text-dark400_light500 mt-3.5'>
                    <span className='body-semibold primary-text-gradient mr-2.5 '>
                      {tag.questions.length}+
                    </span>{' '}
                    Questions
                  </p>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <Noresult
            title='No Tags Found'
            description='It looks like there are no tags found.'
            link='/ask-question'
            linkTitle='Ask a question'
          />
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
