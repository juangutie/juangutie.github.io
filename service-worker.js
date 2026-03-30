self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("juangutie.github.io_v1").then((cache) =>
            cache.addAll([
                "/",
                "/favicon.ico",
                "/index.html",
            ])
        )
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) =>
            response ?? fetch(event.request)
        )
    );
});