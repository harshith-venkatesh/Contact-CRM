module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
