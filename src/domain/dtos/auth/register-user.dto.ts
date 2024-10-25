import { regularExps } from "../../../config";


export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
  ){}

  static create(object: {[key:string]: any}): [string?, RegisterUserDto?] {

    const { name, email, password } = object;

    if (!name) return ['Se esperaba nombre'];
    if (!email) return ['Se esperaba email'];
    if (!regularExps.email.test(email)) return ['Email no es valido'];
    if (!password) return ['Se esperaba password'];
    if (password.length < 6) return ['Password debe contener al menos 6 caracteres'];

    return [undefined, new RegisterUserDto(name, email, password)];
  }

}