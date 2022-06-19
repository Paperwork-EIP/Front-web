import axios from "axios";

export const signIn = async (mail: string, pwd: string) => {
    const payload = {
        email: mail,
        pwd: pwd,
    };
    try {
        const res = await axios.post("/api/login", payload);
        const d = res.data;
        return d;
    } catch (e: any) {
        return null
    }
}