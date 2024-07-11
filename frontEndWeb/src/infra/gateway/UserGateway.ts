import User from "../../domain/User";

export default interface UserGateway {
	create (user: User): Promise<string>;
}

export type CreateUserInput = {
	name: string,
	email: string,
	phone: string,
	password: string
}