import { UsersRepository } from '../repositories/users.repository';
import { IUser } from '../interfaces/IUser.interface';
import { User } from '../entities/user.entity';

export class AuthService {
  private repository: UsersRepository;


  constructor() {
    this.repository = new UsersRepository();
  }

  getUserByEmail = async (email: string): Promise<User | null> => {
    return await this.repository.findUserByEmail(email);
  };

  isValidPassword = async (user: User, password: string): Promise<boolean> => {
    return await this.repository.checkPassword(user, password);
  };

  loginUser = async (user: User, ): Promise<Pick<IUser, 'id' | 'accessToken'>> => {
    const { accessToken } = await this.repository.generateNewTokens(user);
    return { id: user.id, accessToken };
  };
  
  logoutUser = async (userId: number) => {
    const user = await this.repository.findUserById(userId);
    if (!user) return null;

    return await this.repository.generateNewTokens(user);
  };

  getUserByToken = async (accessToken: string) => {
    return await this.repository.getUserByToken(accessToken)
  }
}
