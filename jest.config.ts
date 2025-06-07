import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/utils/',
    '<rootDir>/__tests__/setup/',
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/localStorage.ts'],
};

export default createJestConfig(config);
