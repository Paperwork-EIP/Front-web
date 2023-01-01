import { AxiosResponse } from "axios";
import { Api } from "./api";

export const signIn = async (mail: string, pwd: string) => {
    const payload = {
        email: mail,
        password: pwd,
    };
    try {
        return  Api.post(`/user/login`, payload);
    } catch (e: any) {
        console.log(e);
    }
}

interface SignInCallbackProps
{
    setBadPassword: React.Dispatch<boolean>;
};

export const signInCallback = (res: AxiosResponse, params: any) => {
    const objects = params as SignInCallbackProps;
    if (res.status == 400) {
        params.setBadPassword(true);
    }
}

// const 