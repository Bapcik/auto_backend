import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { AuthController } from '../controllers/auth.controller';

export class AuthRouter implements IRoute {
  public path = '/auth';
  public router = Router();
  private controller: AuthController;

  constructor() {
    this.controller = new AuthController();
    this.init();
  }

  private init() {
    this.router.post('/login', this.controller.loginUserHandler);
    this.router.post('/logout', this.controller.logoutUserHandler);
  }
}
