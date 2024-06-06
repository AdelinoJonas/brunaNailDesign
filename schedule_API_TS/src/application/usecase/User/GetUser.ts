import Email from "../../../domain/Email";
import Password from "../../../domain/Password";
import Phone from "../../../domain/Phone";
import UserRepository from "../../repository/UserRepository";

export default class GetUser {
  constructor (readonly userRepository: UserRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const data = await this.userRepository.get(input.userId); 
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      is_active: data.is_active,
      is_admin: data.is_admin
    };
  }
}

type Input = {
  userId: string,
}

type Output = {
  name: string,
  email: string | Email;
  phone: string | Phone;
  password: string | Password;
  is_admin: boolean,
  is_active:boolean
}