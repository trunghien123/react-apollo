import { get, remove } from "src/utils/cookie";

class AuthService {
    static isLoggedIn(): boolean {
        try {
            const token = get("react_apollo_token");
            if (token) {
                return !!(token);
            }
            return false;
        } catch (Error) {
            return false;
        }
    }
}

export default AuthService;