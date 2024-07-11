import UserGateway, { CreateUserInput } from "./UserGateway";
import HttpClient from "../http/HttpClient";
import User from "../../domain/User";

export default class UserGatewayHttp implements UserGateway {
	
	constructor (readonly httpClient: HttpClient) {
	}

	async create (user: User) {
		const input: CreateUserInput = {
			name: user.name.getValue(),
			email: user.email.getValue(),
			phone: user.phone.getValue(),
			password: user.password.getValue(),
		}
		const userData = await this.httpClient.post("http://localhost:3000/user", input);
		console.log('gateway',userData);
		
		const userId = userData.data.user_id.toString();
		console.log('gateway',userId);
		return userId;
	}
}