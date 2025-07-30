import type { Handle } from "@sveltejs/kit";
import { dev } from "$app/environment";

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

  // Log headers in development to verify they're applied
  if (dev) {
    console.log(`\n🔍 Headers for ${event.request.method} ${event.url.pathname}:`);
    response.headers.forEach((value, key) => {
      // Only show our custom headers and important ones
      if (key.toLowerCase().startsWith('x-') || 
          key.toLowerCase().includes('security') ||
          key.toLowerCase().includes('origin') ||
          key.toLowerCase().includes('frame') ||
          key.toLowerCase().includes('content-type') ||
          key.toLowerCase().includes('referrer') ||
          key.toLowerCase().includes('permissions')) {
        console.log(`  ${key}: ${value}`);
      }
    });
  }

  return response;
};
