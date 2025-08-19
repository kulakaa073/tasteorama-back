import { getUserData } from '../services/user';

export const getUserDataController = async (req, res) => {
  const userId = req.user._id;
  const user = await getUserData(userId);

  res.json({
    status: 200,
    message: 'User data retrieved successfully',
    data: user,
  });
};
