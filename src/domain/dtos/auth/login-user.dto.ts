import { regularExps } from "../../../config";


export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string,
  ){}

  static create(object: {[key:string]: any}): [string?, LoginUserDto?] {

    const { email, password } = object;

    if (!email) return ['Se esperaba email'];
    if (!regularExps.email.test(email)) return ['Email no es valido'];
    if (!password) return ['Se esperaba password'];

    return [undefined, new LoginUserDto(email, password)];
  }

}