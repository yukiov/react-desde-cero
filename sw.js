const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.development.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.development.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "style.css",
    "components/Contador.js"
];

const CACHE_NAME = "v1_cache_contador_react";

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then(() => {
                self.skipWaiting();
            }).catch(console.log);
        })
    )
})

self.addEventListener("activate", (e) => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map(cacheName => {
                cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }))
        }).then(() => {
            self.clients.claim()
        })
    )
})

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            res ? res : fetch(e.request)
        })
    )
})