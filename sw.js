var cacheName = 'v1';
var cacheList = [
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/img/1.jpg',
	'/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

// call install event
self.addEventListener('install', e => {
	console.log('Service Worker: Installed');

});

// call activate event
self.addEventListener('activate', e => {
	console.log('Service Worker: Activated');

	// remove unwanted caches
	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cache !== cacheName) {
						console.log('Serice Worker: Clearing old cache');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// call fetch event
self.addEventListener('fetch', e => {
	console.log('Service Worker: Fetching');

	e.respondWith(
	  fetch(e.request)
	    .then(res => {
	      // make clone of response
	      const resClone = res.clone();
	      console.log('clone created');
	      // open cache
	      caches.open(cacheName).then(cache => {
	        console.log('caches open');
	          // add response to cache
	          cache.put(e.request, resClone);
	          console.log('cache put');
	        });
	      return res;
	    }).catch(err => caches.match(e.request).then(res => res))
	);
});
