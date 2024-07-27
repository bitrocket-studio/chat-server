import { User } from './user.entity';

export const createUser = async (username: User['username']): Promise<User> => {
  const user = new User();
  user.username = username;
  return user;
};
