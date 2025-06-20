'use server';


import { fetcher } from "@/lib/fetcher";

export const unArchiveRecommendation = async (id: string) => {
  try {
    return await fetcher(`/recommendations/${id}/unarchive`, {
      method: 'PATCH',
    });
  } catch (error) {
    console.error('Error unarchiving recommendation:', error);
    throw error;
  }
};
