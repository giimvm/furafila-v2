import { STORAGE_KEYS } from '../config/storageKeys.js';
import { usePersistentState } from './usePersistentState.js';

// Lembra o nome do aluno entre o Checkout e a saudação da Home.
export function useStudentName() {
  return usePersistentState(STORAGE_KEYS.student, '');
}
