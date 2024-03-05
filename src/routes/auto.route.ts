// import { Router } from 'express';
// import { IRoute } from '../interfaces/IRoute.interface';
// import { AutoController } from '../controllers/auto.controller';
// import { upload } from '../middlewares/ValidateUpload.middlewar';

// export class AutoRouter implements IRoute {
//   public path = '/auto';
//   public router = Router();
//   private controller: AutoController;

//   constructor() {
//     this.controller = new AutoController();
//     this.init();
//   }

//   private init() {
//     this.router.post("/",  upload.single('image'), this.controller.createAuto)
//     this.router.get("/", this.controller.getAllAutomobiles)
//     this.router.get("/:id", this.controller.getAutoById)
//   }
// }
