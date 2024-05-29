import User from "../../domain/User";

export default interface UserRepository {
  save(user: User): Promise<any>;
  get(userId: string): Promise<any>;
  getAllUsers(): Promise<User[]>;
  update(userId: string, user: any): Promise<any>;
  delete(userId: string): Promise<any>;
}