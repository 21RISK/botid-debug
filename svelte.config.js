import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Using Vercel adapter for deployment
    adapter: adapter(),
    csp: {
      mode: "auto",
      directives: {
        "default-src": ["self"],
        "object-src": ["none"],
        "script-src": [
          ...(process.env["NODE_ENV"] == "test" ? ["unsafe-eval"] : []),
          "strict-dynamic",
          // Sentry
          // Read more here: https://docs.sentry.io/platforms/javascript/guides/sveltekit/manual-setup/#configure-csp-for-client-side-fetch-instrumentation
          "sha256-y2WkUILyE4eycy7x+pC0z99aZjTZlWfVwgUAfNc1sY8=",
          "https://api.mapbox.com/mapbox-gl-js/",
        ],
        "form-action": ["self"],
        "frame-ancestors": ["none"],
        "frame-src": [
          "self",
          "https://assets.21risk.com",
          "https://p-assets.21risk.com",
          "https://player.vimeo.com",
          "https://dbdiagram.io", // We use dbdiagram for OData docs
          "https://challenges.cloudflare.com/", // Turntile captura challenge
          "https://app.powerbi.com",
        ],
        "img-src": [
          "self", // Allow any images served from same origin
          "https://assets.21risk.com", // Allow images served from our CDN
          "https://p-assets.21risk.com", // <= Allow public images served from our CDN
          "https://api.mapbox.com",
          "blob:", // At the moment, we need this to support QRCode generation
          "data:", // At the moment, we need this to support QRCode generation
        ],
        "font-src": ["self"],
        "base-uri": ["none"],
        "report-uri": [
          "https://o127521.ingest.us.sentry.io/api/5565748/security/?sentry_key=cbc6421785364d028df104cbc33247d6;",
        ],
        "report-to": ["csp-endpoint"],
        "connect-src": [
          "self", // <= Goes without question,
          "https://sentry.io", // <= Sentry
          "https://*.ingest.sentry.io", // <== ingest.sentry.io
          "https://upload.21risk.com", // <= Uploadcare
          "https://uploadcare.com", // <= Uploadcare
          "https://uploadcare.s3-accelerate.amazonaws.com", // <= Uploadcare
          "https://assets.21risk.com", // <= Uploadcare protected assets
          "https://p-assets.21risk.com", // <= Uploadcare public assets
          "ws://ws-eu.pusher.com", // Pusher, websocket
          "wss://ws-eu.pusher.com", // Pusher, websocket
          "https://sockjs-eu.pusher.com", // Pusher, http,
          "https://api.mapbox.com", // Mapbox,
          "https://events.mapbox.com/", // Mapbox,
          "https://api.ipify.org", // IP Geolocation
          "https://challenges.cloudflare.com", // Cloudflare turnstile API
        ],
        "media-src": [
          "self",
          "https://assets.21risk.com",
          "https://p-assets.21risk.com",
        ],
        "style-src": [
          "self",
          "unsafe-inline",
          "https://api.mapbox.com/mapbox-gl-js/",
        ],
        "worker-src": ["self", "blob:"],
      },
    },
  },
};

export default config;
