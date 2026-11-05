// Roteamento por hash (#/cardapio): funciona sem servidor e sem dependências.
export function navigate(path) {
  window.location.hash = path;
}

export function currentPath() {
  return window.location.hash.replace(/^#/, '') || '/';
}

export function subscribe(callback) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

export function isActivePath(path, target) {
  return target === '/' ? path === '/' : path === target || path.startsWith(`${target}/`);
}
