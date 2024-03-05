import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../entities/user.entity';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

export const UserFactory = setSeederFactory(User, async () => {
  const user = new User();
  const accessToken = nanoid();
  const hashedPassword = await bcrypt.hash('123456', 10);
  user.email = 'test@mail.ru';
  user.password = hashedPassword;
  user.accessToken = accessToken;
  return user;
});
