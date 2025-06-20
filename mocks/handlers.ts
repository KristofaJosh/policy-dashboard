import { http, HttpResponse } from "msw";
import { mockRecommendations, mockFilterOptions } from "./data/recommendations";
import { mockUser } from "./data/user";

export const handlers = [
  // Login
  http.post("http://localhost:3001/api/v1/auth/login", async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (username === "admin@security.com" && password === "password") {
      return HttpResponse.json({
        data: { user: mockUser },
        success: true,
        error: null,
      });
    }

    return HttpResponse.json(
      {
        success: false,
        error: "Invalid email or password",
        data: null,
      },
      { status: 401 },
    );
  }),

  // Logout
  http.post("http://localhost:3001/api/v1/auth/logout", () => {
    return HttpResponse.json({
      success: true,
      error: null,
    });
  }),

  // Get recommendations
  http.get("http://localhost:3001/api/v1/recommendations", ({request}) => {

    return HttpResponse.json({
      data: mockRecommendations,
      pagination: {
        totalItems: mockRecommendations.length,
        cursor: {
          next: "id",
        },
      },
      availableTags: mockFilterOptions,
    });
  }),

  // Get single recommendation
  http.get("http://localhost:3001/api/v1/recommendations/:id", ({ params }) => {
    const { id } = params;
    const recommendation = mockRecommendations.find((r) => r.id === id);

    if (!recommendation) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      data: recommendation,
      availableTags: mockFilterOptions,
    });
  }),

  // Archive recommendation
  http.patch(
    "http://localhost:3001/api/v1/recommendations/:id/archive",
    ({ params }) => {
      const { id } = params;
      const recommendation = mockRecommendations.find((r) => r.id === id);

      if (!recommendation) {
        return new HttpResponse(null, { status: 404 });
      }

      recommendation.isArchived = true;

      return HttpResponse.json({
        success: true,
      });
    },
  ),

  // Unarchive recommendation
  http.patch(
    "http://localhost:3001/api/v1/recommendations/:id/unarchive",
    ({ params }) => {
      const { id } = params;
      const recommendation = mockRecommendations.find((r) => r.id === id);

      if (!recommendation) {
        return new HttpResponse(null, { status: 404 });
      }

      recommendation.isArchived = false;

      return HttpResponse.json({
        success: true,
      });
    },
  ),


];
