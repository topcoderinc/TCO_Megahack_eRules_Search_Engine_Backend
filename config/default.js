/* eslint-disable no-magic-numbers, import/no-commonjs */
/**
 * Main config file
 */

module.exports = {
  API_KEY: 'PBiFB4ZEVgRrbIWW6LVm8nxa9YuIAWfJ24CwiAzs',
  PORT: process.env.PORT || 3100,
  LOAD_PARSER: false,
  VERBOSE_LOGGING: true,
  CACHE_INTERVAL: '24 hours',
  API_BASE_URL: 'http://api.data.gov/regulations/v3',
  PARSER_OPTIONS: {}
};
