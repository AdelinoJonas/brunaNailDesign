import UserRepository from "../repository/UserRepository";
import User from "../../domain/User";

export default class UpdateUser {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: { userId: string; data: Partial<User> }): Promise<Output> {
    const existingUser = await this.userRepository.get(input.userId);
    if (!existingUser) {
      throw new Error("User not found");
    }
    const updatedUser = { ...existingUser, ...input.data };
    const data = await this.userRepository.update(input.userId, updatedUser);
    return {
      name: data.name,
      email:data.email,
      phone:data.phone,
      password: data.password
    }
  }
}

type Output = {
  name: string,
  email: string,
  phone: string,
  password: string
};