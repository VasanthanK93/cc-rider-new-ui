/* eslint-disable no-console */
type LogLevel = 'log' | 'info' | 'warn' | 'error';

export function logMessage(level: LogLevel, message: string): void {
  switch (level) {
    case 'log':
      console.log(message);
      break;
    case 'info':
      console.info(message);
      break;
    case 'warn':
      console.warn(message);
      break;
    case 'error':
      console.error(message);
      break;
    default:
      console.log(message);
  }
}
