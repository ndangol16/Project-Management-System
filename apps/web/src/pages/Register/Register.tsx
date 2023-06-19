import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "@/context/auth";

enum RegisterState { INITIAL, LOADING, FAILED }


export default function Register() {

    const [state, setState] = useState<RegisterState>(RegisterState.INITIAL);
  const [error, setError] = useState<string | null>("");

  const [formData, setFormData] = useState({ username: "", password: "", email: "", confirmPassword: "" });

  const auth = useContext(authContext);

  const navigate = useNavigate();


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setState(RegisterState.LOADING);

    console.log(formData);

    const res = await fetch("/api/users/signup", { method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData) });

    const data = await res.json();

    if (res.ok) {
      auth.setUser(data);
      navigate("/login");

    } else {
      setState(RegisterState.FAILED);
      setError(data.error);
    }

  }

  return (
    <div className="grid place-content-center h-screen dark bg-background">
      <form action="" className="w-80 flex gap-10 flex-col">
        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="username" className="text-white">
            Username
          </Label>
          <Input type="username" id="username" placeholder="Username"  value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input type="email" id="email" placeholder="Email"  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <Input type="password" id="password" placeholder="Password"  value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="cpassword" className="text-white">
            Confirm Password
          </Label>
          <Input
            type="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
             value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>
        <div>
          <Button className="w-full" onClick={handleSubmit} >Register</Button>
           {
            state === RegisterState.FAILED && (
              <div className="mt-2">
                <p className="text-red-600">{error}</p>
              </div>
            )
          }

          <p className="text-slate-200 mt-5">
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
