import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { ProductRoutes } from './product/routes';
import { FileUploasRoutes } from './file-upload/routes';
import { ImageRoutes } from './images/routes';

export class AppRoutes {
  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/products', ProductRoutes.routes );
    router.use('/api/upload', FileUploasRoutes.routes );
    router.use('/api/images', ImageRoutes.routes );

    return router;
  }
}

