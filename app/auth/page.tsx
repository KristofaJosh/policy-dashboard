import { LoginForm } from "@/app/auth/login-form";
import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Security Dashboard</CardTitle>
          <CardDescription>
            Sign in to access policy recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              Demo Credentials:
            </p>
            <p className="text-sm font-mono">Username: admin@security.com</p>
            <p className="text-sm font-mono">Password: password</p>
          </div>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
