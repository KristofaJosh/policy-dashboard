"use server";

import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

export async function logoutAction() {
  try {
    const response = await fetcher('/auth/logout', {
      method: 'POST',
    });


    // Regardless of the response, delete the auth token cookie
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    // Even if the API call fails, delete the cookie and consider logout successful
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
    return { success: true, error: null };
  }
}
