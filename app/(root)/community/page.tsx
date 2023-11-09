import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/shared/Filter';
import { UserFilters } from '@/components/shared/filters';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { getAllUsers } from '@/lib/actions/user.action';

const page = async () => {
  const result = await getAllUsers({});
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
          <div>No users yet</div>
        )}
      </section>
    </>
  );
};

export default page;
