import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthForm() {
  return (
    <Card className="w-full p-4">
      <Tabs defaultValue="signIn" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signIn">Sign In</TabsTrigger>
          <TabsTrigger value="signUp">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <SignInForm />
        </TabsContent>
        <TabsContent value="signUp">
          <SignUpForm />{" "}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
