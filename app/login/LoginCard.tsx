import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

export default function LoginCard() {
  const [activeTab, setActiveTab] = React.useState("signUp");
  const router = useSearchParams();
  useEffect(() => {
    const login = router.get("login");

    if (login === "true") setActiveTab("signIn");
  }, []);

  return (
    <Card className="w-full p-4">
      <Tabs
        defaultValue="signUp"
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
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
