import Profile from '@/components/forms/Profile';
import { toast } from '@/components/ui/use-toast';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import React from 'react';

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) {
    toast({
      title: 'Please log in',
      description: 'You must be logged in to perform this action',
    });
    return null;
  }
  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Edit Profile</h1>
      <div className='mt-9'>
        <Profile
          clerkId={userId}
          user={JSON.stringify(mongoUser)}
        />
      </div>
    </>
  );
};

export default page;
