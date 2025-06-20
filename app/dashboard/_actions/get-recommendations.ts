"use server";

import { fetcher } from "@/lib/fetcher";
import { cache } from "react";

export const getRecommendations = cache(
  async (
    values: {
      cursor?: string;
      limit?: number;
      search?: string;
      tags?: string;
      frameworks?: string;
      cloudProviders?: string;
      riskClasses?: string;
      reasons?: string;
      tab?: string;
    } = {},
  ) => {
    try {
      return await fetcher(`/recommendations`, values);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      throw error;
    }
  },
);

export const getRecommendation = async ({ id }: { id: string }) => {
  try {
    return await fetcher(`/recommendations/${id}`);
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    throw error;
  }
};
