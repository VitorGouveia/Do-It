"use strict";
const cached_files = [
    "./",
    "./dist/css/index.css",
    "./dist/javascript/index.js",
    "./dist/javascript/modal.js",
    "./dist/javascript/theme.js",
    "./dist/javascript/todo.js",
    "./dist/javascript/pwa/serviceWorker.js",
];
self.addEventListener("install", (event) => {
    console.log("installing");
    event.waitUntil(caches.open("static").then(cache => {
        return cache.addAll(cached_files);
    }));
});
self.addEventListener("fetch", (event) => {
    console.log("fetching");
    event.respondWith(caches.match(event.request).then(response => {
        return response || fetch(event.request);
    }));
});
