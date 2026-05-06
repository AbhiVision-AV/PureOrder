
// sw.js - Service Worker for PureOrder Push Notifications

self.addEventListener('push', function(event) {
  if (event.data) {
    try {
      // Parse the JSON payload sent from the server/admin
      const data = event.data.json();
      const title = data.title || 'PureOrder';
      
      const options = {
        body: data.message || 'You have a new update.',
        icon: data.icon || 'https://abhivision.in/wp-content/uploads/2024/02/cropped-Favicon-192x192.png', // A default icon
        data: data.url || '/' // Stores the link to open when they tap the notification
      };

      // Show the notification on the device
      event.waitUntil(self.registration.showNotification(title, options));
    } catch (e) {
      // Fallback just in case the data isn't formatted as JSON
      event.waitUntil(
        self.registration.showNotification('PureOrder', {
          body: event.data.text()
        })
      );
    }
  }
});

// What happens when the customer taps the notification
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // Close the notification banner

  const urlToOpen = event.notification.data || '/';

  // Check if the app is already open in a tab, if so, focus it. Otherwise, open a new one.
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});