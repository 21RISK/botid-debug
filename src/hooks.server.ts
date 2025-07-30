import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // Get the response from the request
  const response = await resolve(event);

  // Helper function to set headers more cleanly
  const setHeaders = (headers: Record<string, string>) => {
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  };

  // Basic security headers
  setHeaders({
    "Cross-Origin-Resource-Policy": "same-origin",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "geolocation=(), camera=(), microphone=(), midi=(), usb=()",
  });

  // CORS
  setHeaders({
    "Access-Control-Allow-Origin": "false",
  });

  return response;
};
