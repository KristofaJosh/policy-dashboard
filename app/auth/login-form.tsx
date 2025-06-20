"use client";

import { loginAction } from "@/app/auth/_actions/login";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Schema = z.object({
  username: z.string().min(4, "Invalid username"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const LoginForm = () => {
  const router = useRouter();
  const { login: setLogin } = useAuth();

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof Schema>) => {
    const { data } = await loginAction(values);
    if (!data) return toast.error('Something went wrong while logging in. Please try again.');
    setLogin(data); // just to illustrate zustand familiarity
    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <fieldset
          disabled={form.formState.isSubmitting}
          className="space-y-2 grid gap-4"
        >
          {Object.keys(form.formState.errors).length > 0 && (
            <Alert variant="destructive" className={"mb-4"}>
              <AlertDescription>
                Please fix the errors below then continue
              </AlertDescription>
            </Alert>
          )}
          <FormField
            name={"username"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};
