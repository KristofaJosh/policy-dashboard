"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Error = ({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              Recommendation Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              {error.message ?? "The requested recommendation could not be found."}
            </p>
            <Button asChild>
              <Link href={"/dashboard"}>Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;