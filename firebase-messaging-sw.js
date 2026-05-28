importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA6yX_GnKJ_OiqG10DB4dguV-IM1v8wH9w",
  authDomain: "pureorder-eca2b.firebaseapp.com",
  projectId: "pureorder-eca2b",
  storageBucket: "pureorder-eca2b.firebasestorage.app",
  messagingSenderId: "641924435931",
  appId: "1:641924435931:web:2f015b60ad7bd935fd61fe"
});

const messaging = firebase.messaging();

// 1. BACKGROUND NOTIFICATIONS
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'PureOrder Update';
  const options = {
    body: payload.notification?.body || 'Check out the latest update!',
    icon: '/icon-192.png',
    badge: '/icon-192.png', // Small monochrome icon recommended
    vibrate: [200, 100, 200, 100, 200],
    data: { url: '/customer.html' }
  };
  self.registration.showNotification(title, options);
});

// 2. NOTIFICATION CLICK HANDLER (Opens the app)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// ==========================================
// 3. PWA OFFLINE CACHING (PLAY STORE REQUIREMENT)
// ==========================================
const CACHE_NAME = 'pureorder-offline-v1';
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([ OFFLINE_URL ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Agar user naya page khol raha hai aur internet band hai
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  }
});
