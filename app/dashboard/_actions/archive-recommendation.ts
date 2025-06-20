"use server";


import { fetcher } from "@/lib/fetcher";

export const archiveRecommendation = async (id: string) => {
  try {
    return await fetcher(`/recommendations/${id}/archive`, {
      method: 'PATCH',
    });
  } catch (error) {
    console.error('Error archiving recommendation:', error);
    throw error;
  }
};
