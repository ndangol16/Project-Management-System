import { Loading } from "@/pages/Loading";
import React, { createContext, useEffect, useState } from "react";

type AuthContext = {
    user: User|null;
    setUser: (user: User|null) => void;
}

enum AuthState {LOADING, LOADED, FAILED};

const authContext = createContext<AuthContext>({user:null, setUser: () => {}});


const AuthProvider = ({children}:React.PropsWithChildren) => {
    const [user, setUser] = useState<User|null>(null);
    const [state, setState] = useState<AuthState>(AuthState.LOADING);

    const putUser = (user: User|null) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }

    useEffect(() => {
        const data = localStorage.getItem("user");
        try {
        if (data) {
            setUser(JSON.parse(data));
        }
        setState(AuthState.LOADED);

        } catch (e) {
            console.error("Couldn't parse json");

        }
    }, [])

    return (
        <authContext.Provider value={{user, setUser:putUser}}>
            { state === AuthState.LOADING ? <Loading/> :
            
            children
            }
        </authContext.Provider>
    )
}

export {AuthProvider, authContext};