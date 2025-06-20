import { Inbox } from "lucide-react";

export const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-12">
    <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
      <Inbox className="w-12 h-12 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-2">No recommendations found</h3>
    <p className="text-muted-foreground">{message}</p>
  </div>
);
