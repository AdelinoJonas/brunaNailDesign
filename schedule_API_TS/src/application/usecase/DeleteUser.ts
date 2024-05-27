import UserRepository from "../repository/UserRepository";

export default class DeleteUser {
  constructor (readonly userRepository: UserRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const userData = await this.userRepository.delete(input.userId);
    console.log("usecase",userData);
    
    return {message: `O usuário foi deletado com sucesso.`}; ;
  }
}

type Input = {
  userId: string,
}

type Output = {
  message: any
}

