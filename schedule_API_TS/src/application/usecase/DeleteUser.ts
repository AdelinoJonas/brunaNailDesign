import UserRepository from "../repository/UserRepository";

export default class DeleteUser {
  constructor (readonly userRepository: UserRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const user = await this.userRepository.delete(input.userId);
    return user
  }
}

type Input = {
  userId: string,
}

type Output = {
  message: string,
}