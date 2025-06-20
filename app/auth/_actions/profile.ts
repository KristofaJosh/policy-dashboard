"use server";

import { mockUser } from "@/mocks/data/user";
import { delay } from "@/utils/delay";
import { cookies } from "next/headers";

export async function getUser() {
  await delay(1000); // Simulate network delay
  const cookieStore = await cookies()
  const user = cookieStore.get('auth-token'); // Simulate getting user
  if (!user) {
    return { data: null, success: false, error: "User not found" };
  }
  return { data: { user: mockUser }, success: true, error: null };
}
