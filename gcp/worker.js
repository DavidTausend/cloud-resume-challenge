export default {
  async fetch(request) {
    const url = new URL(request.url)
    const bucket = "davidtausendresume.org" 

    if (url.pathname.startsWith("/assets/")) {
      const gcsUrl = `https://storage.googleapis.com/${bucket}${url.pathname}`
      const response = await fetch(gcsUrl, request)
      return new Response(response.body, response)
    }

    const indexUrl = `https://storage.googleapis.com/${bucket}/index.html`
    const indexResp = await fetch(indexUrl, request)

    const newHeaders = new Headers(indexResp.headers)
    newHeaders.set("Cache-Control", "public, max-age=300")
    newHeaders.set("Content-Type", "text/html; charset=utf-8")

    return new Response(indexResp.body, {
      status: indexResp.status,
      headers: newHeaders,
    })
  },
}