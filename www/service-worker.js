const PRECACHE = 'precahce-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
	'/',
	'index.html',
	'index.html?homescreen=1',
	'?homescreen=1',
	'https://fonts.googleapis.com/css?family=Orbitron',
	'css/style.css',
	'js/app.js',
	'js/progressbar.js',
	'manifest.json'
]

self.addEventListener('activate', function (event) {
	console.log("[ServiceWorker] Installed")

	event.waitUntil(
		caches.open(PRECACHE).then(function(cache){
			console.log("[ServiceWorker] Caching PRECACHE_URLS");
			return cache.addAll(PRECACHE_URLS);
		})
	)
});

self.addEventListener('fetch', function (event) {
	event.waitUntil(
		caches.keys().then(function(PRECACHE) {
			return Promise.all(PRECACHE.map(function(thisPRECACHE) {
				if (thisPRECACHE !== PRECACHE) {
				console.log("[ServiceWorker] Removing Cached Files From", thisPRECACHE);
				return caches.delete(thisPRECACHE);	
				}
			}))
		})
	)
});

self.addEventListener('push', function (event) {
	console.log("[ServiceWorker] Fetching", event.request.url);
});