// Simple logger implementation
// You can replace this with Winston/Pino later if needed

const getTimestamp = () => new Date().toISOString();

export const logger = {
  info: (message, ...args) => {
    console.log(`[INFO] [${getTimestamp()}] ${message}`, ...args);
  },
  error: (message, ...args) => {
    console.error(`[ERROR] [${getTimestamp()}] ${message}`, ...args);
  },
  warn: (message, ...args) => {
    console.warn(`[WARN] [${getTimestamp()}] ${message}`, ...args);
  },
  debug: (message, ...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] [${getTimestamp()}] ${message}`, ...args);
    }
  }
};