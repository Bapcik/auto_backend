import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
import { AutoDto } from '../dto/auto.dto';
import DtoManager from '../helpers/dtoManager';
import { AutoService } from '../services/auto.service';
import { AuthService } from '../services/auth.service';
import FileManager from '../helpers/fileManager';
import config from '../config';
import validateNumber from '../helpers/validateNumber';

export class AutoController {
  private service: AutoService;
  private authService: AuthService;

  constructor() {
    this.service = new AutoService();
    this.authService = new AuthService();
  }

 createAuto: RequestHandler = async (req, res, next) => {
    try {
      if (!req.file) throw ApiError.BadRequest('Ошибка при обработке изображения');
      const autoData = { ...req.body, image: req.file.filename };

      const { dto: autoDto, errors: userErrors } = await DtoManager.createDto(AutoDto, autoData ,{ isValidate: true });
      if (userErrors.length) throw ApiError.BadRequest('Ошибка при валидации формы', userErrors);

      const accessToken = req.header('Authorization');

      if (!accessToken) {
        throw ApiError.UnauthorizedError();
      }

      const user = await this.authService.getUserByToken(accessToken);

      if (!user) {
        throw ApiError.UnauthorizedError();
      }

      const newAuto = await this.service.createAuto(autoDto);

      if (!newAuto) {
        throw ApiError.BadRequest('Ошибка валидации данных');
      }

      res.send(newAuto);
    } catch (e) {
      FileManager.deleteFiles(config.uploadPath, req.files);
      next(e);
    }
  };

  getAllAuto : RequestHandler = async (req, res, next) => {
    try {
      const automobiles = await this.service.getAllAutomobiles()
      res.send(automobiles);
    } catch (e) {
      next(e);
    }
  }


  getAutoById: RequestHandler = async (req, res, next) => {
    try {
      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const auto = await this.service.getOneAuto(id)
      if (!auto) throw ApiError.NotFound('Такого авто нет!');
      res.send(auto);
    } catch (e) {
      next(e);
    }
  }
}
