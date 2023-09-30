const CACHE_NAME = "my-cache"

self.addEventListener("install", (e) => {
  console.log("Installing service worker!!")
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll([`/`, `index.html`, `src/App.jsx`])
      return self.skipWaiting()
    })
  )
})

self.addEventListener("activate", (event) => {
  console.log("Activating service worker")
  event.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", function (event) {
  // Exclude requests with the "chrome-extension" scheme
  if (event.request.url.startsWith("chrome-extension://")) {
    return
  }

  // Handle network requests for other resources
  if (navigator.onLine) {
    let fetchRequest = event.request.clone()
    event.respondWith(
      fetch(fetchRequest).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        let responseToCache = response.clone()

        caches.open(CACHE_NAME).then(function (cache) {
          // console.log("event.request before", event.request)
          // console.log("responseToCache", responseToCache)
          // console.log("cache before", cache)
          cache.put(event.request, responseToCache)
          // console.log("cache after", cache)
        })

        return response
      })
    )
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response
        }
        // Handle network requests for resources bundled within the extension
        if (event.request.url.startsWith(chrome.runtime.getURL("/"))) {
          return fetch(event.request)
        }
      })
    )
  }
})
