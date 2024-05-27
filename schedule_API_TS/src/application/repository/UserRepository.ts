import user from "../../domain/User";

export default interface UserRepository {
  save(user: user): Promise<any>;
  get(userId: string): Promise<any>;
  update(userId: string, user: any): Promise<any>;
  delete(userId: string): Promise<any>;
}