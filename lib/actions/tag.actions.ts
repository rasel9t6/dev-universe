'use server';

import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from './shared.types';
import { connectToDatabase } from '../mongoose';
import User from '@/database/user.model';
import Tag, { ITag } from '@/database/tag.model';

import { FilterQuery } from 'mongoose';
import Question from '@/database/quwstion.model';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';
import { formUrlQuery } from '../utils';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    // Find interactions for the user and group by tags...
    // Interaction...
    return [{ _id: '1', name: 'tag' }];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    // const searchParams = useSearchParams()
    // const router = useRouter()

    let searchOptions = {};

    const { searchQuery, filter } = params;
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: new RegExp(searchQuery, 'i') }];
    }
    switch (filter) {
      case 'popular':
        searchOptions = { questions: -1 };
        break;
      case 'recent':
        searchOptions = { createdAt: -1 };
        break;
      case 'name':
        searchOptions = { name: -1 };
        break;
      case 'old':
        searchOptions = { createdAt: 1 };
        break;

      default:
        break;
    }
    const tags = await Tag.find(query).sort(searchOptions);
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ],
    });
    if (!tag) {
      throw new Error('Tag not found');
    }
    const questions = tag.questions;
    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getPopularTags() {
  try {
    connectToDatabase();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: '$questions' } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
