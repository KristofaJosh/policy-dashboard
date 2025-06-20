"use server";

import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

export async function loginAction({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const data = await fetcher('/auth/login', {}, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    // If login is successful, set the auth token cookie
    const token = "mock-jwt-token-" + Date.now();
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, error: "An error occurred during login", data: null };
  }
}
