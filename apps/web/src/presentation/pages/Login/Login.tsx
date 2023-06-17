import { Label } from "../../../presentation/components/ui/label";
import { Input } from "../../../presentation/components/ui/input";
import { Button } from "../../../presentation/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="grid place-content-center h-screen dark bg-background">
      <form action="" className="w-80 flex gap-10 flex-col">
        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <Input type="password" id="password" placeholder="Password" />
        </div>

        <div>
          <Button className="w-full">Login</Button>
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
