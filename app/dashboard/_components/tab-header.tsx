"use client";

import { getRecommendations } from "@/app/dashboard/_actions/get-recommendations";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Archive, Inbox } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { use, useState } from "react";

export const TabHeader = ({
  recommendationPromise,
}: {
  recommendationPromise: ReturnType<typeof getRecommendations>;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || "active";
  const [activeTab, setActiveTab] = useState(currentTab);


  const { data: recommendations } = use<
    Awaited<ReturnType<typeof getRecommendations>>
  >(recommendationPromise);

  const updateSearchParam = (inputValue: string) => {
    const params = new URLSearchParams(searchParams);
    setActiveTab(inputValue);
    params.set("tab", inputValue);
    params.delete("card");
    window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
  };

  return (
    <Tabs defaultValue={"active"} value={activeTab} className="mb-4">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger
          value="active"
          className="flex items-center gap-2"
          onClick={() => updateSearchParam("active")}
        >
          <Inbox className="w-4 h-4" />
          Active
        </TabsTrigger>
        <TabsTrigger
          value="archived"
          className="flex items-center gap-2"
          onClick={() => updateSearchParam("archived")}
        >
          <Archive className="w-4 h-4" />
          Archived
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
