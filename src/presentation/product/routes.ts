import { Router } from 'express';
import { ProductController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { EmailService, ProductService } from '../services';
import { envs } from '../../config';


export class ProductRoutes {


  static get routes(): Router {

    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.MAILER_SEND_EMAIL
    );

    const productService = new ProductService(emailService);
    const controller = new ProductController(productService);
    
    // Definir las rutas
    router.get('/', controller.getProducts );
    router.get('/:id', controller.getProduct );
    router.post('/', AuthMiddleware.validateJWT, controller.createProduct );
    router.post('/savepurchase', AuthMiddleware.validateJWT, controller.savePurchase );



    return router;
  }


}

