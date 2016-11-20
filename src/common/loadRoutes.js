/**
 * An util to load routes
 */

import _ from 'lodash';
import config from 'config';
import apicache from 'apicache';
import wrapAsync from 'express-wrap-async';

const cache = apicache.middleware;

const cacheSuccesses = cache(config.CACHE_INTERVAL);

/**
 * Load all routes with authentication check
 * @param {Object} router the express router
 * @param {Object} routes the route config
 */
export default function loadRoutes(router, routes) {
  _.forEach(routes, (verbs, url) => {
    _.forEach(verbs, (def, verb) => {
      const actions = [
        (req, res, next) => {
          if (req.query.cache === '1') {
            cacheSuccesses(req, res, next);
          } else {
            next();
            return;
          }
        },
      ];
      const method = def.method;
      if (!method) {
        throw new Error(`method is undefined in ${verb.toUpperCase()} ${url}`);
      }
      actions.push(method);
      router[verb](url, wrapAsync(actions));
    });
  });
}
