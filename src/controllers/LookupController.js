import LookupService from '../services/LookupService';

export default {
  searchNaicCodes,
  searchSubstances,
};

/**
 * Search naics codes
 * @param {Object} req
 * @param {Object} res
 */
async function searchNaicCodes(req, res) {
  const result = await LookupService.searchNaicCodes(req.query);
  res.json(result);
}

/**
 * Search substances
 * @param {Object} req
 * @param {Object} res
 */
function searchSubstances(req, res) {
  const result = LookupService.searchSubstances(req.query);
  res.json(result);
}
