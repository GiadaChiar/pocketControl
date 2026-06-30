
import { loginUser } from "../api/authApi";
import { registerUser } from "../api/authApi";

export async function loginService(email, password) {
    return await loginUser({
        email,
        password
    });
}


export async function registartionService(email,
    name,
    surname,
    password) {
    return await registerUser({
        email,
        name,
        surname,
        password
    });
}