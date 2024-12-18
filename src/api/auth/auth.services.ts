import { IUser } from '../../models/User';
import { AuthLogin, AuthType, AuthUpdate } from '../../types/auth.type';
import { checkPassword, hashPassword } from '../../utils/auth';
import { generateJWT } from '../../utils/jwt';
import { UserDAO } from './auth.dao';

export class UserService {
  static async createAccount(data: AuthType) {
    const { email, password, name } = data;

    const userExists = await UserDAO.findByEmail(email);

    if (userExists) {
      const error = new Error('El usuario ya está registrado...');
      (error as any).status = 409;
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserDAO.createUser({
      email,
      password: hashedPassword,
      name,
    });

    return { message: 'Cuenta creada exitosamente', user };
  }

  static async loginAccount(data: AuthLogin) {
    const { email, password } = data;

    const user = await UserDAO.findByEmail(email);

    if (!user) {
      const error = new Error('Usuario no encontrado');
      (error as any).status = 404;
      throw error;
    }

    const isPasswordCorrect = await checkPassword(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error('Password incorrecto!!');
      (error as any).status = 401;
      throw error;
    }

    const token = generateJWT({ id: user.id });

    return { message: 'Inicio de secion correctamente!!!', token };
  }

  static async updateProfileAccount(data: AuthUpdate, user: IUser) {
    const { email, name } = data;

    const userExists = await UserDAO.findByEmail(email);

    if (userExists && userExists.id.toString() !== user.id.toString()) {
      const error = new Error('Este email ya está registrado');
      (error as any).status = 409;
      throw error;
    }

    await UserDAO.updateUser(user.id, { name, email });

    return { message: 'Cambio de datos correctamente' };
  }
}
