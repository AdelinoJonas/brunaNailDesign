import UserRepository from "../../repository/UserRepository";

export default class GetAllUsers {
  constructor (readonly userRepository: UserRepository) {
  }
  
  async execute (): Promise<Output[]> {
    const users: any[] = await this.userRepository.getAllUsers();
    const output: Output[] = users.map(user => ({
      userId: user.user_id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      is_admin: user.is_admin,
      is_active: user.is_active
    }));
    return output;
  }
}

type Output = {
  userId: string,
  name: string,
  email: string,
  phone: string,
  is_admin: boolean,
  is_active:boolean
}