var CACHE_NAME = 'mercury-cache';
var urlsToCache = [
    'css/stylesheet.css',
    './index.html',
    'js/main.js',
    'js/poseidon.min.js'
];

//call install event
//attach event listener to the worker
self.addEventListener('install', e => {
    console.log('Service worker installed');
    //perform install steps
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                  //cache data for offline viewing
                  return cache.addAll(urlsToCache);
              })
              .catch(ex => {
                  console.log(`failed to cache: ${ex}`);
              })
    );
});


//call activate event
self.addEventListener('activate', e => {
    console.log('Service worker activated');
    //clean up old/unwanted cache
    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                  return Promise.all(
                      cacheNames.map(cache => {
                          if (cache !== CACHE_NAME) {
                              //clean old cache
                              return caches.delete(cache)
                          } 
                      })
                  )
              })
    )
});

//call fetch event which loads cache files if offline
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).catch(() => {
            //not currently available/online, so load from cache
            caches.match(e.request);
        })
    )
});