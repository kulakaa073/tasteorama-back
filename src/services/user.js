import { UsersCollection } from '../db/models/user.js';

export const getUserData = async (userId) => {
  const user = await UsersCollection.findOne(userId).select('-password -__v');
  return user;
};
