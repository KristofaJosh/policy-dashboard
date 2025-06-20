"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Archive,
  ArchiveRestore,
  Shield,
  Cloud,
  AlertTriangle,
  Info,
  CheckCircle,
  Calendar,
  Target,
  Expand,
  ExternalLink,
} from "lucide-react";
import type { Recommendation } from "@/types";
import { cn } from "@/utils/cn";
import { toast } from "sonner";

interface RecommendationDetailProps {
  recommendation: Recommendation;
  isFullPage?: boolean;
  onClose?: () => void;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
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

const containerClasses = (isFullPage: boolean) =>
  isFullPage
    ? "w-full max-w-4xl mx-auto"
    : "fixed inset-y-0 right-0 w-full max-w-2xl bg-background border-l shadow-lg z-50 flex flex-col";

export function RecommendationDetail({
  recommendation,
  onArchive,
  onUnarchive,
  onClose,
  isFullPage = false,
}: RecommendationDetailProps) {
  const [isArchiving, setIsArchiving] = useState(false);

  const RiskIcon = riskIcons[recommendation.riskClass];

  const handleArchiveClick = async () => {
    if (!onArchive && !onUnarchive) return;

    setIsArchiving(true);
    try {
      if (recommendation.isArchived && onUnarchive) {
        onUnarchive(recommendation.id);
      } else if (!recommendation.isArchived && onArchive) {
        onArchive(recommendation.id);
      }
      if (!isFullPage) onClose?.();
    } catch (error) {
      console.error("Archive operation failed:", error);
    } finally {
      setIsArchiving(false);
    }
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/dashboard/recommendation/${recommendation.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.info("Link copied to clipboard!");
    } catch {
      toast.info("Failed to copy link");
    }
  };

  return (
    <div className={containerClasses(isFullPage)}>
      {/* Header */}
      <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center justify-between p-6 border-b">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className={cn(
              "text-sm font-medium",
              riskColors[recommendation.riskClass],
            )}
          >
            <RiskIcon className="w-4 h-4 mr-1" />
            {recommendation.riskClass}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Risk Score: {recommendation.riskScore}/100
          </span>
        </div>
        <div className={cn("flex items-center justify-between gap-2")}>
          <div className={"flex items-center gap-2"}>
            {!isFullPage && (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  title="Open in full page"
                >
                  <Link href={`/dashboard/recommendation/${recommendation.id}`}>
                    <Expand className="w-4 h-4 mr-2" />
                    Expand
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  title="Copy shareable link"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleArchiveClick}
              disabled={isArchiving}
            >
              {recommendation.isArchived ? (
                <>
                  <ArchiveRestore className="w-4 h-4 mr-2" />
                  Unarchive
                </>
              ) : (
                <>
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </>
              )}
            </Button>
          </div>{" "}
          {!isFullPage && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Title and Description */}
          <div>
            <h1 className="text-2xl font-bold mb-4">{recommendation.title}</h1>
            <p className="text-muted-foreground leading-relaxed">
              {recommendation.description}
            </p>
          </div>

          <Separator />

          {/* Impact Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Impact Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{recommendation.impact}</p>
            </CardContent>
          </Card>

          {/* Resources Enforced */}
          {recommendation.resourcesEnforced.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Resources Enforced by Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendation.resourcesEnforced.map((resource, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {resource}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Cloud Providers */}
          {recommendation.cloudProviders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  Cloud Providers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recommendation.cloudProviders.map((provider) => (
                    <Badge key={provider} variant="secondary">
                      {provider}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Framework Compliance */}
          {recommendation.frameworks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Framework Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recommendation.frameworks.map((framework) => (
                    <div
                      key={framework.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">
                        {framework.name}
                      </span>
                      {framework.version && (
                        <Badge variant="outline" className="text-xs">
                          v{framework.version}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Implementation Reasons */}
          {recommendation.reasons.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Implementation Reasons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendation.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created:</span>
                <span>
                  {new Date(recommendation.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated:</span>
                <span>
                  {new Date(recommendation.updatedAt).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <Badge
                  variant={recommendation.isArchived ? "secondary" : "default"}
                >
                  {recommendation.isArchived ? "Archived" : "Active"}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Recommendation ID:
                </span>
                <span className="font-mono text-xs">{recommendation.id}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
