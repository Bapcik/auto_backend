import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
import { UserDto } from '../dto/auth.dto';
import DtoManager from '../helpers/dtoManager';
import { AuthService } from '../services/auth.service';
import { UserLoginRequest } from '../dto/userLoginRequest.dto';

export class AuthController {
  private service: AuthService;
  

  constructor() {
    this.service = new AuthService();
  }

  loginUserHandler: RequestHandler = async (req, res, next) => {
    try {
      const { dto: userDto, errors: userErrors } = await DtoManager.createDto(UserLoginRequest, req.body, { isValidate: true });
      if (userErrors.length) throw ApiError.BadRequest('Ошибка при валидации формы', userErrors);

      const existingUser = await this.service.getUserByEmail(userDto.email);

      const isValidPassword: boolean = await this.service.isValidPassword(existingUser, userDto.password);
      if (!isValidPassword) throw ApiError.BadRequest('Введен неверный email или пароль');

      const { accessToken } = await this.service.loginUser(existingUser);

      const { dto } = await DtoManager.createDto(UserDto, { ...existingUser, accessToken });
      res.json(dto);
    } catch (e) {
      next(e);
    }
  };

  logoutUserHandler: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.body;
      if (!(id)) throw ApiError.UnauthorizedError();

      await this.service.logoutUser(id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}
