"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInWithEmailAndPassword, signInWithOAuth } from "./authActions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import getURL from "@/utils/getURL";
import OAuthForm from "./OAuthForm";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createSupabaseFrontendClient();

  async function onSubmit(credentials: z.infer<typeof FormSchema>) {
    const { data, error } = await signInWithEmailAndPassword(credentials);
    if (!error) {
      router.push("/dashboard");
    } else {
      toast({
        title: error.message,
      });
      console.log(error);
    }
  }

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getURL}/auth/callback`,
      },
    });
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    {...field}
                    type="email"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    type="password"
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="btn w-full flex gap">
            Sign In
          </Button>
        </form>
      </Form>
      <OAuthForm />
    </div>
  );
}
