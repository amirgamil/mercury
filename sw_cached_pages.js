var CACHE_NAME = 'mercury-cache';

//call install event
//attach event listener to the worker
self.addEventListener('install', e => {
    console.log('Service worker installed');
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
self.addEventListener('fetch', event => {
    event.respondWith(
      fetch(event.request)
      .then(res => {
            //This does not manually cache assets, but will cache all visited websites on-demand (since only a one pager)
            //clone response
            const resClone = res.clone();
            //open cache
            caches.open(CACHE_NAME)
                .then(cache => {
                    //add response to cache
                    cache.put(event.request, resClone);
                });
            return res;
      }).catch(err => caches.match(event.request).then(res => res))     
    );
});