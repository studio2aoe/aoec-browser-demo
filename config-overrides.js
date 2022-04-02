const path = require('path')

module.exports = {
  webpack: function(config, env) {
    config.resolve.alias = {    
      ...config.resolve.alias,
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    }
    return config;
  },
  jest: function(config) {
    config.moduleNameMapper = {
      '^\\@src/(.*)$': '<rootDir>/src/$1',
      '^\\@components$': '<rootDir>/src/components',
      '^\\@components/(.*)$': '<rootDir>/src/components/$1'
    }
    return config;
  },
}