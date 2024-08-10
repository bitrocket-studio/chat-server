import { UserOAuth } from '../auth/auth.schema';
import { Database } from '../config/database';
import { User } from './user.entity';

export const findUser = async (user: User) => {
  const repoUser = Database.getRepository('User');
  return repoUser.findOne({ where: { email: user.email } });
};

export const createUser = async (user: UserOAuth) => {
  const repoUser = Database.getRepository('User');
  const newUser = new User();
  newUser.sid = user.sid;
  newUser.email = user.email;
  newUser.email_verified = user.email_verified;
  newUser.given_name = user.given_name;
  newUser.family_name = user.family_name;
  newUser.nickname = user.nickname;
  newUser.name = user.name;
  newUser.picture = user.picture;
  newUser.sub = user.sub;
  const instanceOfUser = repoUser.create(newUser);
  await repoUser.save(instanceOfUser);
  return instanceOfUser;
};

export const isUserRegistered = async (user: User) => {
  const repoUser = Database.getRepository('User');
  const userRegistered = await repoUser.findOne({ where: { email: user.email } });
  return !!userRegistered;
};
