// firebase-messaging-sw.js

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

// Background notification handler
messaging.onBackgroundMessage((payload) => {
console.log('Received background message:', payload);

const notificationTitle =
payload.notification?.title || 'PureOrder';

const notificationOptions = {
body:
payload.notification?.body || 'New update available',

icon:
  payload.notification?.image || '/icon.png',

badge: '/badge.png',

vibrate: [200, 100, 200],

data: {
  url: '/customer.html'
}

};

self.registration.showNotification(
notificationTitle,
notificationOptions
);
});

// Open app when notification clicked
self.addEventListener('notificationclick', (event) => {
event.notification.close();

event.waitUntil(
clients.openWindow(
event.notification.data.url
)
);
});
