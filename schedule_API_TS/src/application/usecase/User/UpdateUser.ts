import User from "../../../domain/User";
import UserRepository from "../../repository/UserRepository";

type Email = string;
type Phone = string;
type Password = string;

interface PartialUserData {
  name?: string;
  email?: Email;
  phone?: Phone;
  password?: Password;
}

export default class UpdateUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: { userId: string; data: PartialUserData }): Promise<User> {
    const existingUser = await this.userRepository.get(input.userId);
    if (!existingUser) {
      throw new Error("User not found");
    }
    const updatedUser = { ...existingUser, ...input.data };
    const data = await this.userRepository.update(input.userId, updatedUser);
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password
    };
  }
}