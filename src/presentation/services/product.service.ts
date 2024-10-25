import { ProductModel } from '../../data';
import { PurchaseModel } from '../../data/mongo/models/purchase.model';
import {
  CreateProductDto,
  CreatePurchaseDto,
  CustomError,
  PaginationDto,
} from '../../domain';
import { EmailService } from './email.service';
import { envs } from '../../config';

export class ProductService {
  constructor(private readonly emailService: EmailService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      title: createProductDto.title,
    });
    if (productExists) throw CustomError.badRequest('Producto existente');

    try {
      const product = new ProductModel(createProductDto);

      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async savePurchase(createPurchaseDto: CreatePurchaseDto) {
    try {
      const purchase = new PurchaseModel(createPurchaseDto);

      await purchase.save();

      await this.sendEmailPurchaseConfirm(purchase);

      return purchase;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private async sendEmailPurchaseConfirm(purchase) {
    const { items } = await purchase.populate('items.product');
    const { user } = await purchase.populate('user');

    let html = `
    <h1>¡Gracias por su compra!</h1>
    <h3>Detalle del Pedido:</h3>
    <br />
    <section style="display:grid;
    grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-columns: minmax(100px, auto);">`;

    items.map((item) => {
      html =
        html +
        `<div style={grid-column: 1}>${item.product.title} </div>
    <div style={grid-column: 2}>Cantidad: ${item.quantity} </div>
    <div style={grid-column: 3}>Precio: $ ${item.price.toFixed(2)} </div>`;
    });

    html = html + `</section>
    <br /><br />
    <p>En breve nos pondremos en contacto para coordinar el envio y posterior entrega.</p>`;

    const options = {
      to: user.email,
      subject: 'Confirmacion de compra',
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent)
      throw CustomError.internalServer(
        'Error al enviar correo de confirmacion'
      );

    return true;
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      if (!products) throw CustomError.badRequest('No existen productos');

      const returnProducts = products;

      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/products?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products: returnProducts,
      };
    } catch (error) {
      throw CustomError.internalServer('Internal server error');
    }
  }

  async getProduct(id: any) {
    try {
      const product = await ProductModel.findById(id);

      if (!product)
        throw CustomError.badRequest(`No existe producto con id ${id}`);

      return product;
    } catch (error) {
      throw CustomError.internalServer('Internal server error');
    }
  }
}
