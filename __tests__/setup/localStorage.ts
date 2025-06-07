import { localStorageMock } from '../utils/mocks';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});
