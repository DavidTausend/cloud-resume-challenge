export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Your Azure Function App base URL (no trailing slash)
    // Example: https://viewcounter.azurewebsites.net
    const FUNCTION_ORIGIN = "https://viewcounter.azurewebsites.net";

    // Your Azure Storage Static Website origin (no trailing slash)
    // Example: https://davidtausendcrc2025.z13.web.core.windows.net
    const STATIC_ORIGIN = "https://davidtausendcrc2025.z13.web.core.windows.net";

    // 1) Proxy API to Functions
    if (url.pathname.startsWith("/api/")) {
      const target = new URL(FUNCTION_ORIGIN);
      target.pathname = url.pathname; // keep /api/counter
      target.search = url.search;

      // Forward request as-is (method, headers, body)
      const resp = await fetch(target.toString(), request);

      // Add CORS just in case (harmless for same-origin)
      const headers = new Headers(resp.headers);
      headers.set("Access-Control-Allow-Origin", url.origin);
      headers.set("Vary", "Origin");

      return new Response(resp.body, { status: resp.status, headers });
    }

    // 2) Serve static assets from Storage
    if (url.pathname.startsWith("/assets/")) {
      const originUrl = `${STATIC_ORIGIN}${url.pathname}`;
      const resp = await fetch(originUrl, request);

      const headers = new Headers(resp.headers);
      headers.set("Cache-Control", "public, max-age=31536000, immutable");

      return new Response(resp.body, { status: resp.status, headers });
    }

    // 3) SPA fallback -> index.html
    const indexResp = await fetch(`${STATIC_ORIGIN}/index.html`, request);
    const headers = new Headers(indexResp.headers);
    headers.set("Cache-Control", "public, max-age=300");
    headers.set("Content-Type", "text/html; charset=utf-8");

    return new Response(indexResp.body, { status: indexResp.status, headers });
  },
};