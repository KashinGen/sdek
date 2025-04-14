import nextJest from 'next/jest';
import type { Config } from '@jest/types';

export const customJestConfig: Config.InitialOptions = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  verbose: true,
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export const createJestConfig = nextJest({
  dir: './',
});

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG mock first
      '\\.svg$': '<rootDir>/src/tests/svgMock.js',
      '^@/(.*)$': '<rootDir>/src/$1',
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

module.exports = jestConfig;
