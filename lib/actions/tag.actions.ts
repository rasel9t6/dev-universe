'use server';


import { GetTopInteractedTagsParams } from './shared.types';
import { connectToDatabase } from '../mongoose';
import User from '@/database/user.model';
import Tag from '@/database/tag.model';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    // Find interactions for the user and group by tags...
    // Interaction...
    return [{_id:'1',name:'tag'}];
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getAllTags() {
    try {
        connectToDatabase();
        const tags = await Tag.find({})
        return {tags}
    } catch (error) {
        console.log(error);
        throw error
        
        
    }
}