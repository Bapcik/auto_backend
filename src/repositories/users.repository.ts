import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/IUser.interface';
import { nanoid } from 'nanoid';

export class UsersRepository extends Repository<User> {
  constructor() {
    super(User, appDataSource.createEntityManager());
  }

  findUserByEmail = async (email: string): Promise<User | null> => {
    return await this.findOne({ where: { email } });
  };

  checkPassword = async (user: User, password: string): Promise<boolean> => {
    return await user.comparePassword(password);
  };

  generateNewTokens = async (user: User): Promise<Pick<IUser, 'accessToken'>> => {
    const accessToken = nanoid();
    user.accessToken = accessToken;

    await this.save(user);
    return user;
  };

  findUserById = async (id: number): Promise<User | null> => {
    return await this.findOne({ where: { id }});
  };
}
