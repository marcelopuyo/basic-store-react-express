import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';



export class FileUploasRoutes {


  static get routes(): Router {

    const router = Router();

    const controller = new FileUploadController(new FileUploadService);

    router.use(FileUploadMiddleware.containFiles);
    router.use(FileUploadMiddleware.validateTypes());
    router.use(TypeMiddleware.validateTypes(['users', 'products', 'categories']));
    
    // Definir las rutas
    router.post('/single/:type', controller.uploadFile );
    router.post('/multiple/:type', controller.uploadFileMultiple );



    return router;
  }


}

