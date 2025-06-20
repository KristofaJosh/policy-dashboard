import { getRecommendations } from "@/app/dashboard/_actions/get-recommendations";
import { FilterDropdownComponent } from "@/app/dashboard/_components/filter-dropdowns";
import { SearchFiltersComponent } from "@/app/dashboard/_components/search-filters";
import { TabHeader } from "@/app/dashboard/_components/tab-header";
import { PageComponent } from "@/app/dashboard/page-component";
import { Skeleton } from "@/components/ui/skeleton";
import { SSComponentProp } from "@/types";
import { Suspense } from "react";

export default async function DashboardPage({
  searchParams,
}: SSComponentProp<
  null,
  {
    q: string;
    frameworks: string;
    cloudProviders: string;
    riskClasses: string;
    reasons: string;
  }
>) {
  const {
    frameworks,
    cloudProviders,
    riskClasses,
    reasons,
    q: search,
  } = await searchParams;

  const recommendationPromise = getRecommendations({
    search,
    frameworks,
    cloudProviders,
    riskClasses,
    reasons,
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className={"my-4"}>
        <h1 className={"font-semibold text-2xl"}>Project Overview</h1>
        <h2 className={"text-sm"}>
          A React-based dashboard that enables security teams to efficiently
          manage and review security rules recommendations. The application
          provides an intuitive interface for viewing, searching, and managing
          security policy rules while handling large datasets efficiently.
        </h2>
      </div>

      <Suspense fallback={<Skeleton className="h-10 w-3/12 mb-4" />}>
        <TabHeader recommendationPromise={recommendationPromise} />
      </Suspense>
      <SearchFiltersComponent />
      <Suspense
        fallback={
          <div className={"flex items-center gap-2 mb-4 max-w-2xl"}>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        }
      >
        <FilterDropdownComponent
          recommendationPromise={recommendationPromise}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-14" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <PageComponent recommendationPromise={recommendationPromise} />
      </Suspense>
    </div>
  );
}
