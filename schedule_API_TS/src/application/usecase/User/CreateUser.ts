import User from "../../../domain/User";
import UserRepository from "../../repository/UserRepository";

export default class CreateUser {
  constructor ( readonly userRepository: UserRepository) {
  }

  async execute (input: Input): Promise<Output> {
    const user = User.create(input.name, input.email, input.phone, input.password);
    const data = await this.userRepository.save(user);
    return {user_id: data};
  }
}

type Input = {
  name: string,
  email: string,
  phone: string,
  password: string
}

type Output = {
  user_id: any
}