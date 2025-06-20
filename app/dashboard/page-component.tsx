"use client";

import { getRecommendations } from "@/app/dashboard/_actions/get-recommendations";
import { RecommendationDetail } from "@/app/dashboard/_components/recommendation-detail";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import type { Recommendation } from "@/types";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { EmptyState } from "./_components/empty-state";
import { InfiniteScroll } from "./_components/infinite-scroll";
import { RecommendationCard } from "./_components/recommendation-card";

export const PageComponent = ({
  recommendationPromise,
}: {
  recommendationPromise: ReturnType<typeof getRecommendations>;
}) => {
  const {
    data: { data: _recommendations },
  } = use(recommendationPromise);

  const [recommendations, setRecommendations] = useState(_recommendations);

  const searchParams = useSearchParams();

  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation | null>();

  const currentTab = searchParams.get("tab") ?? "active";

  const { archived, active } = recommendations.reduce(
    (
      acc: {
        archived: Recommendation[];
        active: Recommendation[];
      },
      cur,
    ) => {
      cur.isArchived ? acc.archived.push(cur) : acc.active.push(cur);
      return acc;
    },
    { archived: [], active: [] },
  );

  const handleCloseRecommendation = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("card");
    setSelectedRecommendation(null);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`,
    );
  };

  const handleSelectRecommendation = (recommendation: Recommendation) => {
    setSelectedRecommendation((prev) =>
      prev?.id === recommendation.id ? null : recommendation,
    );
  };

  const handleArchiveClick = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, isArchived: !rec.isArchived } : rec,
      ),
    );
    if (selectedRecommendation?.id === id) {
      setSelectedRecommendation(null);
    }
  };

  useEffect(() => {
    // in a real app, I would put this in a nested route
    const cardId = searchParams.get("card");
    if (cardId) {
      const recommendation = recommendations.find((rec) => rec.id === cardId);
      if (recommendation) setSelectedRecommendation(recommendation);
    }
  }, [searchParams.get("card")]);

  return (
    <div>
      <Tabs defaultValue={"active"} value={currentTab}>
        <TabsContent value="active" className="space-y-6">
          {!active.length && (
            <EmptyState message="Try adjusting your search criteria or filters." />
          )}
          <ul className="grid gap-4">
            <InfiniteScroll>
              {active.map((recommendation) => (
                <li key={recommendation.id}>
                  <RecommendationCard
                    recommendation={recommendation}
                    onSelect={handleSelectRecommendation}
                    onArchive={handleArchiveClick}
                    isSelected={
                      selectedRecommendation?.id === recommendation.id
                    }
                  />
                </li>
              ))}
            </InfiniteScroll>
          </ul>
        </TabsContent>

        <TabsContent value="archived" className="space-y-6">
          {!archived.length && (
            <EmptyState message={`No ${currentTab} recommendations found.`} />
          )}
          <ul className="grid gap-4">
            <InfiniteScroll>
              {archived.map((recommendation) => (
                <li key={recommendation.id}>
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    onSelect={handleSelectRecommendation}
                    onUnarchive={handleArchiveClick}
                    isSelected={
                      selectedRecommendation?.id === recommendation.id
                    }
                  />
                </li>
              ))}
            </InfiniteScroll>
          </ul>
        </TabsContent>
      </Tabs>

      {selectedRecommendation && (
        <RecommendationDetail
          onUnarchive={handleArchiveClick}
          onArchive={handleArchiveClick}
          recommendation={selectedRecommendation}
          onClose={handleCloseRecommendation}
        />
      )}
    </div>
  );
};
