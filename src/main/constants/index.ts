export const SESSION = {
  key: process.env.JWT_SESSION_KEY || 'KEY',
  lifetime: process.env.JWT_SESSION_LIFETIME || '1d',
};
