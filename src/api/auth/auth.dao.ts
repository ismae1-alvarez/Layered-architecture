import User, { IUser } from '../../models/User';
import { AuthType } from '../../types/auth.type';

export class UserDAO {
  static async findByEmail(value: string): Promise<IUser | null> {
    return await User.findOne({ value });
  }

  static async createUser(data: AuthType): Promise<IUser> {
    const user = new User(data);
    return await user.save();
  }

  static async updateUser(
    id: string,
    data: { name: string; email: string },
  ): Promise<IUser> {
    const user = await User.findById(id);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;

    return await user.save();
  }
}
