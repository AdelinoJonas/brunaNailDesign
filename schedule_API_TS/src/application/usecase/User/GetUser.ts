import UserRepository from "../../repository/UserRepository";

export default class GetUser {
  constructor (readonly userRepository: UserRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const user = await this.userRepository.get(input.userId);
    
    return {
      userId: user.user_id,
      name: user.name,
      email: user.email,
      phone:user.phone,
      is_admin: user.is_admin
    }
  }
}

type Input = {
  userId: string,
}

type Output = {
  userId: string,
  name: string,
  email: string,
  phone: string
  is_admin: boolean
}