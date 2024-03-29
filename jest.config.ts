import type {Config} from 'jest';

const config: Config = {
  testMatch: [ "**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/src/tests/mocks', '<rootDir>/src/tests/setup']
};

export default config;