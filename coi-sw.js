// GitHub Pages のようにレスポンスヘッダーを設定できないホスティングでも、
// スレッド有効の Godot ビルド（SharedArrayBuffer が必要）を動かすための Service Worker。
// 同一オリジンのレスポンスに COOP / COEP ヘッダーを付け足して Cross-Origin Isolation を有効にする。

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // 外部オリジン（Google Fonts など）はブラウザにそのまま任せる
  if (new URL(req.url).origin !== self.location.origin) return;
  if (req.cache === "only-if-cached" && req.mode !== "same-origin") return;

  e.respondWith(
    fetch(req).then((res) => {
      if (res.status === 0) return res;
      const headers = new Headers(res.headers);
      headers.set("Cross-Origin-Opener-Policy", "same-origin");
      headers.set("Cross-Origin-Embedder-Policy", "require-corp");
      headers.set("Cross-Origin-Resource-Policy", "same-origin");
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
    })
  );
});
