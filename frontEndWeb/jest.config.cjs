module.exports = {
  // setupFilesAfterEnv: ['@testing-library/jest-dom'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'css'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
};