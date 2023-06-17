import { Account } from "../../entities/account";

export default interface IAuthentication {
    auth(params: authParams): Promise<Account>;

    signup(params: signupParams): Promise<Account>;
}

export type authParams = {
    username: string;
    password: string;
}

export type signupParams = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}