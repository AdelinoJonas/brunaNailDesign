import UserRepository from "../../repository/UserRepository";

export default class GetUser {
  constructor (readonly userRepository: UserRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const user = await this.userRepository.get(input.userId);
    return {
      id: user.user_id,
      name: user.name,
      email: user.email,
      phone:user.phone,
      is_admin: user.is_admin,
      is_active: user.is_active
    }
  }
}

type Input = {
  userId: string,
}

type Output = {
  id: string,
  name: string,
  email: string,
  phone: string,
  is_admin: boolean,
  is_active:boolean
}