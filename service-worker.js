const REPOSITORY = "juangutie.github.io";
const CACHE_VERSION = "v3"
const URLS = [
    "/",
    "/favicon.ico",
    "/index.html",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(`${REPOSITORY}_${CACHE_VERSION}`).then((cache) =>
            cache.addAll(URLS)
        )
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.filter((key) =>
                key.startsWith(REPOSITORY) && !key.endsWith(CACHE_VERSION)
            ).map((key) =>
                caches.delete(key)
            )  
        ))
    )
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) =>
            response ?? fetch(event.request).catch((error) => 
                new Response(error, {
                    status: 408,
                    headers: {"Content-Type": "text/plain"}
                })
            )
        )
    );
});