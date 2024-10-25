import { CustomError } from '../errors/custom.error';

export class ProductEntity {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public category: string,
    public price: number,
    public discountPercentage: number,
    public rating: number,
    public stock: number,
    public tags: string[],
    public brand: string,
    public sku: string,
    public weight: number,
    public dimensions: { width: number, height: number, depth: number },
    public warrantyInformation: string,
    public shippingInformation: string,
    public availabilityStatus: string,
    public reviews: [{
     id: string,
     comentId: string,
     rating: number,
     comment: string,
     date: Date,
     reviewerName: string,
     reviewerEmail: string
    }],
    public returnPolicy: string,
    public minimumOrderQuantity: number,
    public meta: {
      createdAt: Date,
      updatedAt: Date,
      barcode: string,
      qrCode: string
    },
    public images: string[],
    public thumbnail: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const {
      id,
      title,
      description,
      category,
      price,
      discountPercentage,
      rating,
      stock,
      tags,
      brand,
      sku,
      weight,
      dimensions,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      reviews,
      returnPolicy,
      minimumOrderQuantity,
      meta,
      images,
      thumbnail
 } =  object;

    if (!id) throw CustomError.badRequest('Se esperaba id');
    if (!title) throw CustomError.badRequest('Se esperaba title');
    if (!price) throw CustomError.badRequest('Se esperaba precio');
    if (!stock) throw CustomError.badRequest('Se esperaba stock');

    return new ProductEntity(
      id,
      title,
      description,
      category,
      price,
      discountPercentage,
      rating,
      stock,
      tags,
      brand,
      sku,
      weight,
      dimensions,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      reviews,
      returnPolicy,
      minimumOrderQuantity,
      meta,
      images,
      thumbnail
      );
  }

}
