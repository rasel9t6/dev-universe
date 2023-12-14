'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { ProfileSchema } from '@/lib/validations';
import { usePathname, useRouter } from 'next/navigation';
import { updateUser } from '@/lib/actions/user.action';
import router from 'next/router';
interface Props {
  clerkId: string;
  user: string;
}
const Profile = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || '',
      username: parsedUser.username || '',
      portfolioWebsite: parsedUser.portfolioWebsite || '',
      location: parsedUser.location || '',
      bio: parsedUser.bio || '',
    },
  });
  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);
    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });
      router.back();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-9 flex w-full flex-col gap-9'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel>
                Name <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Your name'
                  className='no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 max-h-[56px] border'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel>
                User name <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Your username'
                  className='no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 max-h-[56px] border'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='portfolioWebsite'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel>Portfolio Link</FormLabel>
              <FormControl>
                <Input
                  type='url'
                  placeholder='Your Portfolio URL'
                  className='no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 max-h-[56px] border'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder='Where are you from?'
                  className='no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 max-h-[56px] border'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel>
                Bio <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What's special about you?"
                  className='no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 max-h-[56px] border'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-7 justify-end'>
          <Button
            type='submit'
            className='primary-gradient w-full'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;