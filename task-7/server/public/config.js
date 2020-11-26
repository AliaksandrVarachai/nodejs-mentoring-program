const protocol = 'http';
const host = 'localhost';
const port = 3000;

export const origin = `${protocol}://${host}:${port}`;

export const pageLoginPathname = '/static/login.html';
export const pageRegisterPathname = '/static/register.html';

export const pageLoginUrl = new URL(pageLoginPathname, origin).href;
export const pageRegisterUrl = new URL(pageRegisterPathname, origin).href;

export const authLoginPathname = '/auth/login';
export const authRegisterPathname = '/auth/register';
export const authRefreshPathname = '/auth/refresh';

export const authLoginUrl = new URL(authLoginPathname, origin);
export const authRegisterUrl = new URL(authRegisterPathname, origin);
export const authRefreshUrl = new URL(authRefreshPathname, origin);
