importScripts('./cache-polyfill.js');


var cacheName = 'cache-v1';
var cacheFiles = [
	'/',
	'index.html',
	'index.html?homescreen=1',
	'?homescreen=1',
	'https://fonts.googleapis.com/css?family=Orbitron',
	'css/style.css',
	'js/app.js',
	'js/progressbar.js',
	'sound/beep.wav',
	'manifest.json'
]

self.addEventListener('install', function(event) {
	console.log("[ServiceWorker] Installed")

	event.waitUntil(
		caches.open(cacheName).then(function(cache){
			console.log("[ServiceWorker] Caching cacheFiles");
			return cache.addAll(cacheFiles);
		})
	)
})

self.addEventListener('activate', function(event) {
	console.log("[ServiceWorker] Activated")

	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {
				if (thisCacheName !== cacheName) {
				console.log("[ServiceWorker] Removing Cached Files From", thisCacheName);
				return caches.delete(thisCacheName);	
				}
			}))
		})
	)
})

self.addEventListener('fetch', function(event) {
	console.log("[ServiceWorker] Fetching", event.request.url);
})