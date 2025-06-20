"use client";

import { logoutAction } from "@/app/auth/_actions/logout";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const Account = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user, logout } = useAuth();
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutAction()
      await logout();
      router.replace('/auth');
    } catch (error) {
      toast.error('Something went wrong while logging out. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex items-center gap-4">
      <div className={"hidden md:block text-sm"}>
        Welcome, <span className="font-medium">{user?.name}</span>
      </div>
      <ThemeToggle />
      <Button disabled={loading} variant="ghost" size="sm" onClick={handleLogout}>
        <LogOut className="w-4 h-4 mr-2" />
        {loading ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );
};
