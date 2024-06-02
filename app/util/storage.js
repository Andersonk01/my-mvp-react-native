import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = new Storage({
  // Máximo de itens que podem ser armazenados (padrão é 1000)
  size: 1000,

  // Usando AsyncStorage como backend
  storageBackend: AsyncStorage,

  // Tempo de expiração em milissegundos (1000 * 3600 * 24 significa 1 dia)
  // defaultExpires: 1000 * 3600 * 24,
  defaultExpires: null,

  // Habilitar cache na memória (padrão é true)
  enableCache: true,
});
