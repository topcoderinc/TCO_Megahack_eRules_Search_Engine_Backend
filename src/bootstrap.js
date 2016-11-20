/* eslint-disable no-magic-numbers */
/**
 * Configure all libraries
 */

import bluebird from 'bluebird';
import mongoose from 'mongoose';
import decorate from 'decorate-it';
import request from 'superagent';
import Joi from 'joi';
import config from 'config';

mongoose.Promise = bluebird;
bluebird.promisifyAll(request);
require('babel-runtime/core-js/promise').default = bluebird; // eslint-disable-line import/no-commonjs

Joi.limit = () => Joi.number().integer().min(1).max(1000).default(20);
Joi.offset = () => Joi.number().integer().min(0).default(0);

decorate.configure({
  debug: config.VERBOSE_LOGGING,
});
