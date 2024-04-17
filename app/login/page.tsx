import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthForm() {
  return (
    <Card className="w-full p-4">
      <Tabs defaultValue="signUp" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signUp">Sign Up</TabsTrigger>
          <TabsTrigger value="signIn">Sign In</TabsTrigger>
        </TabsList>
        <TabsContent value="signUp">
          <SignUpForm />{" "}
        </TabsContent>
        <TabsContent value="signIn">
          <SignInForm />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
