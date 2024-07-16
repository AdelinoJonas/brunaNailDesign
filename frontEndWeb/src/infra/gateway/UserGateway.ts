export default interface UserGateway {
	save (user: any): Promise<any>;
}

// export type CreateUserInput = {
// 	name: string,
// 	email: string,
// 	phone: string,
// 	password: string
// }