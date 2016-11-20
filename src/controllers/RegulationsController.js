import RegulationsService from '../services/RegulationsService';

export default {
  getDetails,
  search,
};

/**
 * Get regulations details
 * @param {Object} req
 * @param {Object} res
 */
async function getDetails(req, res) {
  const result = await RegulationsService.getDetails(req.query.documentId, req.query.zip);
  res.json(result);
}

/**
 * search regulations
 * @param {Object} req
 * @param {Object} res
 */
async function search(req, res) {
  const result = await RegulationsService.search(req.query);
  res.json(result);
}
