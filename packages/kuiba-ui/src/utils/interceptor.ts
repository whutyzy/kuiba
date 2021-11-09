export type Interceptor = (...args: any[]) => Promise<boolean> | boolean
