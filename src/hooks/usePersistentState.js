import { useEffect, useState } from 'react';
import { appStorage } from '../services/storage.js';

// useState que sobrevive ao recarregamento. Recebe o storage por parâmetro (DIP).
export function usePersistentState(key, initialValue, storage = appStorage) {
  const [value, setValue] = useState(() => storage.read(key, initialValue));

  useEffect(() => {
    storage.write(key, value);
  }, [key, value, storage]);

  return [value, setValue];
}
