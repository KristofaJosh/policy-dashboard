import { getRecommendation } from "@/app/dashboard/_actions/get-recommendations";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RecommendationDetail } from "@/app/dashboard/_components/recommendation-detail";
import type { SSComponentProp } from "@/types";

export default async function RecommendationPage({
  params,
}: SSComponentProp<{ id: string }>) {
  const { id: recommendationId } = await params;
  const {
    data: { data: recommendation },
  } = await getRecommendation({ id: recommendationId });

  if(!recommendation) return notFound()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={"/dashboard"}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <RecommendationDetail
          recommendation={recommendation}
          isFullPage={true}
        />
      </div>
    </div>
  );
}
