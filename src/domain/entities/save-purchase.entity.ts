import { CustomError } from '../errors/custom.error';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

export class SavePurchaseEntity {
  constructor(
    public id: string,
    public user: UserEntity,
    public date: Date,
    public items: [
      {
        product: ProductEntity;
        quantity: number;
        price: number;
      }
    ]
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, user, date, items } = object;

    if (!id) throw CustomError.badRequest('Se esperaba id');
    if (!user) throw CustomError.badRequest('Se esperaba usuario');
    if (!items) throw CustomError.badRequest('Se esperaba al menos un articulo');

    return new SavePurchaseEntity(id, user, date, items);
  }
}
