import axios from "axios";

const api = "http://localhost:8080";

export const signIn = async (mail: string, pwd: string) => {
    const payload = {
        email: mail,
        password: pwd,
    };
    try {
        const res = await axios.post(`${api}/user/login`, payload);
        const d = res.data;
        return d;
    } catch (e: any) {
        return null
    }
}