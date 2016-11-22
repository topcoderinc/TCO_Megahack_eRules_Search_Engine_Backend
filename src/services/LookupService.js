import request from 'superagent';
import decorate from 'decorate-it';
import Joi from 'joi';
import co from 'co';
import HTTPError from 'http-errors';
import _ from 'lodash';
import parser from 'lrs_parser';

import substances from '../substances.json';

// ------------------------------------
// Exports
// ------------------------------------

const RegulationsService = {
  searchNaicCodes,
  searchSubstances,
  searchCities
};

decorate(RegulationsService, 'RegulationsService');

export default RegulationsService;

/**
 * Make request to SBA GOV API
 * @param {Object} req
 * @returns {Object} the response body
 * @private
 */
async function _makeRequest(req) {
  try {
    const { body } = await req.endAsync();
    return body;
  } catch (e) {
    const status = _.get(e, 'response.body.status');
    const message = _.get(e, 'response.body.message');
    if (status && message) {
      throw new HTTPError(status, message);
    }
    throw e;
  }
}

/**
 * Search naics codes
 * @param {Object} criteria the search criteria
 * @param {String} criteria.searchTerm
 * @param {Number} criteria.offset
 * @param {Number} criteria.limit
 * @returns {{items: Array, total: Number}} the results
 */
async function searchNaicCodes(criteria) {
  return await co(parser.searchNaicsCodes(criteria.searchTerm,
    criteria.offset,
    criteria.limit));
}

searchNaicCodes.params = ['criteria'];
searchNaicCodes.schema = {
  criteria: {
    searchTerm: Joi.string(),
    offset: Joi.offset(),
    limit: Joi.limit(),
  },
};

/**
 * Search substances
 * @param {Object} criteria the search criteria
 * @param {String} criteria.searchTerm
 * @param {Number} criteria.offset
 * @param {Number} criteria.limit
 * @returns {{items: Array, total: Number}} the results
 */
function searchSubstances(criteria) {
  let filtered = substances;
  if (criteria.searchTerm) {
    const q = criteria.searchTerm.toLowerCase();
    filtered = _.filter(filtered, (item) => _.includes(item.name.toLowerCase(), q));
  }
  return {
    total: filtered.length,
    items: filtered.slice(criteria.offset, criteria.offset + criteria.limit),
  };
}

searchSubstances.params = ['criteria'];
searchSubstances.schema = {
  criteria: {
    searchTerm: Joi.string(),
    offset: Joi.offset(),
    limit: Joi.limit(),
  },
};

/**
 * Search cities
 * @param {String} state to search
 * @returns Array the results
 */
async function searchCities(criteria) {
  return await _makeRequest(request.get('http://api.sba.gov/geodata/city_links_for_state_of/' + criteria.state + '.json'));
}

searchCities.params = ['criteria'];
searchCities.schema = {
  criteria: {
    state: Joi.string().required(),
  }
};
