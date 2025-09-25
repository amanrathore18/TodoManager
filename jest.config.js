module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo|expo-modules-core|react-native|@react-native|@unimodules|unimodules|sentry-expo|expo-local-authentication)/)',
  ],
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$':
      '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
