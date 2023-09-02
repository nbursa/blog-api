declare module 'morgan';
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CORS_ORIGINS?: string;
    }
  }
}
