import { Response } from "express";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { EmailService } from "./email.service";


export class AuthService {

  constructor(
    private readonly emailService: EmailService
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email});

    if (existUser) throw CustomError.badRequest('Email existente');


    try {
      const user = new UserModel(registerUserDto)

      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      //Email de confirmacion
      await this.sendEmailValidationLink(user.email);


      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id});
      if (!token) throw CustomError.internalServer('Error al generar el jwt');

      return {
        user: userEntity,
        token: token
      };
      
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

  }

  public async loginUser(loginUserDto: LoginUserDto) {

    const user = await UserModel.findOne({ email: loginUserDto.email});

    if (!user) throw CustomError.badRequest('Usuario o contraseña erroneo');

    const compare = bcryptAdapter.compare(loginUserDto.password, user.password);
    
    if (compare) {
      
      if (!user.emailValidated) throw CustomError.badRequest('Usuario no verificado');
  
      const { password, ...userEntity} = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id});
      if (!token) throw CustomError.internalServer('Error al generar el jwt');

      return {
        user: userEntity,
        token: token
      };
    } else {
      throw CustomError.badRequest('Usuario o contraseña erroneo');
    };

  }

  private async sendEmailValidationLink(email: string) {

    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer('Error generando token');

    const link = `${envs.WEBSERVICE_URL}/api/auth/validate-email/${token}`;

    const html = `
    <h1>Validacion de email</h1>
    <p>Haga click en el siguiente link para validar su cuenta</p>
    <a href="${link}">Valide su email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Valide su email',
      htmlBody: html
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw CustomError.internalServer('Error al enviar correo de confirmacion');

    return true;
  }

  public async validateEmail(token: string) {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized('Token invalido');

    const { email } = payload as { email: string};
    if (!email) throw CustomError.internalServer('Token sin email');

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.internalServer('Email inexistente');

    user.emailValidated = true;
    await user.save();

    return true;
  }

}