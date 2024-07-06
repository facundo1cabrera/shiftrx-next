import { Backend_URL } from "@/lib/Constants";
import { RegisterUser } from "@/models/RegisterUser";
import axios from "axios";

export class UserService {
    async register(user: RegisterUser) {
        try {
            await axios.post(`${Backend_URL}/auth/register`, {
                email: user.email,
                password: user.password,
                name: user.name
            })

            return {
                success: true
            };

        } catch (e) {
            return {
                success: false
            }
        }
    }
}