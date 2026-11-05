import { STORAGE_KEYS } from '../config/storageKeys.js';
import { appStorage } from './storage.js';

// Usado no rodapé para recomeçar a demonstração do zero.
export function resetDemoData() {
  Object.values(STORAGE_KEYS).forEach((key) => appStorage.remove(key));
  window.location.hash = '/';
  window.location.reload();
}
