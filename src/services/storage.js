// Abstração de persistência (Inversão de Dependências):
// hooks e serviços dependem de { read, write, remove }, não do localStorage em si.
// Nos testes basta passar createStorage(createMemoryBackend()).

export function createMemoryBackend() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
  };
}

function pickDefaultBackend() {
  try {
    const probe = '__cantina_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return createMemoryBackend(); // modo privado / localStorage bloqueado
  }
}

export function createStorage(backend = pickDefaultBackend()) {
  return {
    read(key, fallback) {
      try {
        const raw = backend.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    write(key, value) {
      try {
        backend.setItem(key, JSON.stringify(value));
      } catch {
        /* sem espaço ou bloqueado: o app continua funcionando em memória */
      }
    },
    remove(key) {
      try {
        backend.removeItem(key);
      } catch {
        /* ignora */
      }
    },
  };
}

export const appStorage = createStorage();
