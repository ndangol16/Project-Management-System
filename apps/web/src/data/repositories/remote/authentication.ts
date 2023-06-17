import { Account } from '../../../domain/entities/account';
import IAuthentication, { authParams, signupParams } from '../../../domain/repositories/remote/authentication';

export default class Authentication implements IAuthentication {
    async auth({username, password}: authParams): Promise<Account> {
        try {
            let res = await fetch("/api/login", {body: JSON.stringify({username, password})});
            if (res.ok) {
                res = await res.json();
                return {email: "", token: ""};
            }
            throw new Error("Something went wrong!")
        } catch (e: unknown) {
            throw new Error("Something went wrong!")

        }
        
    }
    signup(params: signupParams): Promise<Account> {
        throw new Error('Method not implemented.');
    }

}