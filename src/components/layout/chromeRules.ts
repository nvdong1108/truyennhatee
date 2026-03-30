const CHROMELESS_ROUTES = ['/', '/hoan-thanh'];

export function shouldHideSiteChrome(pathname: string): boolean {
  return CHROMELESS_ROUTES.includes(pathname);
}
