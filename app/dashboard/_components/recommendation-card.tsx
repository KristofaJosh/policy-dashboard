"use client";

import { archiveRecommendation } from "@/app/dashboard/_actions/archive-recommendation";
import { unArchiveRecommendation } from "@/app/dashboard/_actions/unarchive-recommendation";
import { usePathname, useSearchParams } from "next/navigation";

import { SyntheticEvent, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Archive,
  ArchiveRestore,
  Cloud,
  AlertTriangle,
  Shield,
  Info,
  ChevronRight,
} from "lucide-react";
import type { Recommendation } from "@/types";
import { cn } from "@/utils/cn";
import { toast } from "sonner";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onSelect?: (recommendation: Recommendation) => void;
  isSelected?: boolean;
}

const riskColors = {
  LOW: "bg-green-100 text-green-800 border-green-200",
  MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-200",
  HIGH: "bg-orange-100 text-orange-800 border-orange-200",
  CRITICAL: "bg-red-100 text-red-800 border-red-200",
};

const riskIcons = {
  LOW: Shield,
  MEDIUM: Info,
  HIGH: AlertTriangle,
  CRITICAL: AlertTriangle,
};

export function RecommendationCard({
  recommendation,
  onSelect,
  onUnarchive,
  onArchive,
  isSelected = false,
}: RecommendationCardProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isArchiving, setIsArchiving] = useState(false);

  const RiskIcon = riskIcons[recommendation.riskClass];

  const handleArchiveClick = async (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsArchiving(true);
    try {
      if (recommendation.isArchived) {
        await unArchiveRecommendation(recommendation.id);
        if(onUnarchive) onUnarchive(recommendation.id);
        return;
      }
      await archiveRecommendation(recommendation.id);
      if (onArchive) onArchive(recommendation.id);
      toast.success(`Successfully archived recommendation #${recommendation.id}`);
    } catch (error) {
      toast.error("Failed to archive recommendation");
    } finally {
      setIsArchiving(false);
    }
  };

  const handleCardClick = () => {
    if (isArchiving) return; // Prevent selection while archiving
    if (onSelect) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("card", recommendation.id);
      window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
      onSelect(recommendation);
    }
  };

  return (
    <Card
      aria-disabled={isArchiving}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-primary",
      )}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2">
              {recommendation.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {recommendation.description}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              variant="outline"
              className={cn(
                "text-xs font-medium",
                riskColors[recommendation.riskClass],
              )}
            >
              <RiskIcon className="w-3 h-3 mr-1" />
              {recommendation.riskClass}
            </Badge>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Cloud Providers */}
            {recommendation.cloudProviders.length > 0 && (
              <div className="flex items-center gap-1">
                <Cloud className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-1">
                  {recommendation.cloudProviders.slice(0, 3).map((provider) => (
                    <Badge
                      key={provider}
                      variant="secondary"
                      className="text-xs"
                    >
                      {provider}
                    </Badge>
                  ))}
                  {recommendation.cloudProviders.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{recommendation.cloudProviders.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Frameworks */}
            {recommendation.frameworks.length > 0 && (
              <div className="flex gap-1">
                {recommendation.frameworks.slice(0, 2).map((framework) => (
                  <Badge
                    key={framework.id}
                    variant="outline"
                    className="text-xs"
                  >
                    {framework.name}
                  </Badge>
                ))}
                {recommendation.frameworks.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{recommendation.frameworks.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleArchiveClick}
            disabled={isArchiving}
            className="flex-shrink-0"
          >
            {recommendation.isArchived ? (
              <ArchiveRestore className="w-4 h-4" />
            ) : (
              <Archive className="w-4 h-4" />
            )}
            <span className="sr-only">
              {recommendation.isArchived ? "Unarchive" : "Archive"}
            </span>
          </Button>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          Risk Score: {recommendation.riskScore}/100 • Updated{" "}
          {new Date(recommendation.updatedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
