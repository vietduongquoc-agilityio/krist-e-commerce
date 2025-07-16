import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@app/auth': '<rootDir>/authConfig/mocks/auth.ts',
    'next-auth/providers/credentials':
      '<rootDir>/authConfig/mocks/next-auth-providers-credentials.ts',
    'next-auth': '<rootDir>/authConfig/mocks/next-auth.ts',
  },
  collectCoverageFrom: [
    'src/components/**',
    'src/hooks/**',
    'src/services/**',
    'src/utils/**',
    'src/layouts/**',
    '!src/app/**',
    '!src/**/index.ts',
    '!src/actions/**',
    '!src/components/**/*.snap',
    '!src/layouts/**/*.snap',
    '!src/app/**/**/*.snap',
    '!src/**/*.stories.ts',
    '!src/**/*.stories.tsx',
    '!src/app/**/route.ts',
    '!src/app/**/robots.ts',
    '!src/app/**/sitemap.ts',
    '!src/app/**/layout.tsx',
    '!src/app/**/loading.tsx',
    '!src/app/**/error.tsx',
    '!src/app/**/not-found.tsx',
    '!src/app/api/**',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
