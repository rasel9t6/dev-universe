'use client';

import React from 'react';
import Image from 'next/image';
import { deleteQuestion } from '@/lib/actions/question.action';
import { usePathname, useRouter } from 'next/navigation';
import { deleteAnswer } from '@/lib/actions/answer.action';
import { toast } from '../ui/use-toast';

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    toast({
      title: 'Edited',
      description: 'Your question has been successfully edited.',
      variant: 'default',
    });
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === 'Question') {
      toast({
        title: 'Question Deleted',
        description: 'Your question has been successfully deleted.',
        variant: 'destructive',
      });
      // Delete Question
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });
    } else if (type === 'Answer') {
      toast({
        title: 'Answer Deleted',
        description: 'Your answer has been successfully deleted.',
        variant: 'destructive',
      });
      // Delete Answer
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });
    }
  };

  return (
    <div className='flex items-center justify-end gap-3 max-sm:w-full'>
      {type === 'Question' && (
        <Image
          src='/assets/icons/edit.svg'
          alt='edit'
          width={14}
          height={14}
          className='cursor-pointer object-contain'
          onClick={handleEdit}
        />
      )}

      <Image
        src='/assets/icons/trash.svg'
        alt='delete'
        width={14}
        height={14}
        className='cursor-pointer object-contain'
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
