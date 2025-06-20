import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading recommendation...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loading;