import { useSyncExternalStore } from 'react';
import { currentPath, subscribe } from './navigation.js';

export function usePath() {
  return useSyncExternalStore(subscribe, currentPath);
}

// Encontra a rota cujo padrão ("/pedido/:id") combina com o caminho atual.
function matchRoute(routes, path) {
  const segments = path.split('/').filter(Boolean);

  for (const route of routes) {
    const pattern = route.path.split('/').filter(Boolean);
    if (pattern.length !== segments.length) continue;

    const params = {};
    const matches = pattern.every((part, index) => {
      if (part.startsWith(':')) {
        params[part.slice(1)] = decodeURIComponent(segments[index]);
        return true;
      }
      return part === segments[index];
    });

    if (matches) return { Page: route.component, params };
  }

  return { Page: routes[0].component, params: {} }; // rota desconhecida: volta ao início
}

export function useRoute(routes) {
  const path = usePath();
  return { path, ...matchRoute(routes, path) };
}
