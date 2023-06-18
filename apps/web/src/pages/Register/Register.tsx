import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="grid place-content-center h-screen dark bg-background">
      <form action="" className="w-80 flex gap-10 flex-col">
        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="username" className="text-white">
            Username
          </Label>
          <Input type="username" id="username" placeholder="Username" />
        </div>
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
        <div className="grid w-full max-w-lg items-center gap-1.5">
          <Label htmlFor="cpassword" className="text-white">
            Confirm Password
          </Label>
          <Input
            type="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <Button className="w-full">Register</Button>
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
