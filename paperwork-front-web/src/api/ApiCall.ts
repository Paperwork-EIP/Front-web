import { AxiosResponse } from "axios";
import { signInCallback } from "./Auth";

interface CallCallback {
  call: ApiCall;
  callback: (res: AxiosResponse, params: any) => void;
}

export enum ApiCall {
  SIGNIN,
}

export const ApiCallbacks: Array<CallCallback> = [
    {call: ApiCall.SIGNIN, callback: signInCallback},

]

export const callbackhandle = (call: ApiCall, res: AxiosResponse, params: any) =>
{
    const callback = ApiCallbacks.find((c) => {return c.call === call});
    if (callback) {
        callback.callback(res, params);
        return res.data;
    } else {
        throw new Error('Callback not implemeted yet');
    }
}
