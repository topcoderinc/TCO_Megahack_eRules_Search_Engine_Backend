import decorate from 'decorate-it';
import Joi from 'joi';
import co from 'co';
import _ from 'lodash';
import parser from 'lrs_parser';

import substances from '../substances.json';

// ------------------------------------
// Exports
// ------------------------------------

const RegulationsService = {
  searchNaicCodes,
  searchSubstances,
};

decorate(RegulationsService, 'RegulationsService');

export default RegulationsService;


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
