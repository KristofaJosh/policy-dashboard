import { Account } from "@/app/dashboard/_components/account";
import { Shield } from "lucide-react";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div className={'hidden md:block'}>
                <h1 className="text-xl font-bold">Security Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Policy Recommendations
                </p>
              </div>
            </div>
            <Account />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
