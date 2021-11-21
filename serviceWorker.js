const CACHE = {
  name: "DoIt",
  urls: [
    "/",
    "/dist/css/index.css",
    "/dist/javascript/index.js",
    "/dist/javascript/modal.js",
    "/dist/javascript/theme.js",
    "/dist/javascript/todo.js",
  ]
}

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE.name];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

self.addEventListener("install", event => {
  console.log("installing")
  event.waitUntil(
    caches.open("static").then(cache => {
      return cache.addAll(CACHE.urls);
    })
  );
})

self.addEventListener("fetch", event => {
  console.log("fetching")
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})

// self.addEventListener("activate", () => {
//   console.log("activating")
// })


// window.addEventListener("beforeinstallprompt", e => {
//   console.log("before install")
//   e.preventDefault()
// })

// navigator.serviceWorker.ready.then(registration => {
//   if(!registration.pushManager) {
//     console.log("no notifications support")
//     return false
//   }

//   registration.pushManager.subscribe({
//     userVisibleOnly: true
//   }).then(subscription => {
//     console.log("subscribed")
//   }).catch(error => {
//     console.log("error in subscription", error)
//   })
// })