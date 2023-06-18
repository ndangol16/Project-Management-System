import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "@/context/auth";
import { Loader2 } from "lucide-react";

enum LoginState { INITIAL, LOADING, FAILED };

export default function Login() {

  const [state, setState] = useState<LoginState>(LoginState.INITIAL);
  const [error, setError] = useState<String | null>("");

  const [formData, setFormData] = useState({ username: "", password: "" });

  const auth = useContext(authContext);

  const navigate = useNavigate();


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setState(LoginState.LOADING);


    const res = await fetch("/api/users/login", { method: "POST", body: JSON.stringify(formData) });

    const data = await res.json();

    if (res.ok) {
      auth.setUser(data);
      navigate("/");

    } else {
      setState(LoginState.FAILED);
      setError(data.error);
    }

  }

  useEffect(() => {
    if (auth.user) {
      navigate("/");

    }

  }, [])


  return (
    <div className="grid place-content-center h-screen dark bg-background">
      <form action="" className="w-80 flex gap-10 flex-col">
        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="username" className="text-white">
            Username
          </Label>
          <Input type="username" id="username" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <Input type="password" id="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </div>


        <div>
          <Button className="w-full" onClick={handleSubmit} disabled={state === LoginState.LOADING}>
            {state === LoginState.LOADING && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />

            )}

            Login</Button>
          {
            state === LoginState.FAILED && (
              <div className="mt-2">
                <p className="text-red-600">{error}</p>
              </div>
            )
          }
          <p className="text-slate-200 mt-5">
            Don't have an account?{" "}
            <Link to={"/register"} className="underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
