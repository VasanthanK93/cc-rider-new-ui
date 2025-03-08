import { logMessage } from './logger';
interface ServiceWorkerMessage {
  command: string;
  message: string;
}
export function clearDataCache() {
  if (!navigator.serviceWorker.controller) {
    return 'Warning! No ServiceWorker';
  }

  logMessage('info', 'Clearing cache..');
  navigator.serviceWorker.controller.postMessage({
    command: 'clearCache',
    message: 'all',
  });
  logMessage('info', 'Cleared cache');
  return 'Cleared cached data';
}

export async function sendMessage(message: string) {
  if (!navigator.serviceWorker.controller) {
    return 'Warning! No ServiceWorker';
  }

  const registration = await navigator.serviceWorker.ready;
  registration.showNotification(message);
  return 'sent message';
}
