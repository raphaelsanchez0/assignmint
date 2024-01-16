import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { twMerge } from "tailwind-merge";

export default function Login() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
    bg-gradient-to-br from-green-400 to-green-950 "
    >
      <div className="w-3/12">
        <Card>
          <CardHeader>Login</CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-xl font-semibold">
                    Email
                  </Label>
                  <Input id="name" placeholder="Enter Email" type="text" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-xl font-semibold">
                    Password
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter Password"
                    type="password"
                  />
                </div>
                <Button className="btn font-semibold text-lg">Login</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
