import type { HandleClientError } from "@sveltejs/kit";
import { dev } from "$app/environment";
import { initBotId } from "botid/client/core";

export function init() {
  initBotId({
    protect: [
      {
        path: "/api/post-data",
        method: "POST",
      },
      {
        path: "/protected",
        method: "POST",
      },
    ],
  });
}

// Client-side error handling
export const handleError: HandleClientError = ({
  error,
  event,
  status,
  message,
}) => {
  // Log error to console in development
  if (dev) {
    console.error("Client-side error:", error);
    console.error("Event:", event);
    console.error("Status:", status);
    console.error("Message:", message);
  }

  // You can send errors to an external service here
  // Example: sendToErrorService(error, event);

  // Return a user-friendly error message
  return {
    message: message || "Something went wrong. Please try again.",
  };
};
