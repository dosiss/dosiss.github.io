
var STATIC_CACHE_CONTAINER = "static_v1"
var STATIC_FILES = [
    "/public/",
    "/public/index.js",
    "/public/index.css",
    "https://fonts.googleapis.com/css2?family=Ranchers&display=swap",
    "https://fonts.gstatic.com/s/ranchers/v8/zrfm0H3Lx-P2Xvs2ArDfBi8.woff2",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
]

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(STATIC_CACHE_CONTAINER)
        .then(function(cache){
            cache.addAll(STATIC_FILES)
        })
    )
})

self.addEventListener('activate', function(event){
    console.log("service worker activated", event)
})

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                return response
            }
        })
    )
})
