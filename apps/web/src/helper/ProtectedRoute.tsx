import { authContext } from "@/context/auth";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    redirect:string;
    guest: boolean;
}

export default function ProtectedRoute({children, redirect, guest}:React.PropsWithChildren<Props>) {

    const auth = useContext(authContext);
    const navigate = useNavigate();

    console.log(auth);
    console.log(guest);

    if (guest && auth.user || !guest && !auth.user ) {
        console.log("navigating");
        navigate(redirect);
        return
    }

    return (<>{children}</>);



}