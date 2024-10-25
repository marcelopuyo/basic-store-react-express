import { validators } from '../../../config';
import { UserEntity } from '../../entities/user.entity';

export class CreatePurchaseDto {
  private constructor(
    public user: UserEntity,
    public date: Date = new Date(),
    public items: []
  ) {}

  static create(props: { [key: string]: any }): [string?, CreatePurchaseDto?] {
    const { user, date, items } = props;

    if (!user) return ['Se esperaba usuario'];
    if (!items) return ['Se esperaba al menos un item'];

    const items1 = items.map(function (item) {
      const newItem = {
        product: item.id,
        price: item.total,
        quantity: item.cantidad,
      };
      return newItem;
    });

    try {
      return [undefined, new CreatePurchaseDto(user, date, items1)];
    } catch (error) {
      console.log('error');
    }
    return ['null', undefined];
  }
}
