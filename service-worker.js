self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("juangutie.github.io_v7").then((cache) =>
            cache.addAll([
                "/",
                "/favicon.ico",
                "/index.html",
            ])
        )
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => 
            Promise.all(
                keys.filter((key) =>
                    key.startsWith("juangutie.github.io") && !key.endsWith("v7")
                ).map((key) =>
                    caches.delete(key)
                )
            )
        )
    )
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) =>
            response ?? fetch(event.request)
        )
    );
});