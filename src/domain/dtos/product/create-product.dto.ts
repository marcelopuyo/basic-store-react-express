import { validators } from '../../../config';

export class CreateProductDto {
  private constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly category: string,
    public readonly price: number,
    public readonly discountPercentage: number,
    public readonly rating: number,
    public readonly stock: number,
    public readonly tags: string[],
    public readonly brand: string,
    public readonly sku: string,
    public readonly weight: number,
    public readonly dimensions: {},
    public readonly warrantyInformation: string,
    public readonly shippingInformation: string,
    public readonly availabilityStatus: string,
    public readonly reviews: [{}],
    public readonly returnPolicy: string,
    public readonly minimumOrderQuantity: number,
    public readonly meta: {},
    public readonly images: string[],
    public readonly thumbnail: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    const {
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
    } = props;

    if (!title) return ['Se esperaba nombre'];

    return [
      undefined,
      new CreateProductDto(
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
      ),
    ];
  }
}
