// Service Worker for Ontario G1 Study App
const CACHE_NAME = 'g1-study-app-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/App.css',
  '/src/index.css',
  '/src/pages/Home.jsx',
  '/src/pages/Handbook.jsx',
  '/src/pages/Quizzes.jsx',
  '/src/pages/PracticeTests.jsx',
  '/src/pages/Progress.jsx',
  '/src/components/Navigation.jsx',
  '/src/components/OfflineIndicator.jsx',
  '/src/data/handbookData.js',
  '/src/data/quizData.js'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
      .catch(() => {
        // Return offline page if both cache and network fail
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html')
        }
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Sync any offline data when connection is restored
    console.log('Background sync completed')
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}
