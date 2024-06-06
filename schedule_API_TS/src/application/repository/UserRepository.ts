import User from "../../domain/User";

export default interface UserRepository {
  save(user: User): Promise<any>;
  get(userId: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
  update(id: string, user: any): Promise<any>;
  delete(userId: string): Promise<any>;
}