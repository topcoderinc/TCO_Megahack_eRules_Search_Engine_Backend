
import LookupController from './controllers/LookupController';
import RegulationsController from './controllers/RegulationsController';

export default {
  '/search': {
    get: {
      method: RegulationsController.search,
    },
  },
  '/detail': {
    get: {
      method: RegulationsController.getDetails,
    },
  },
  '/lookups/naics': {
    get: {
      method: LookupController.searchNaicCodes,
    },
  },
  '/lookups/substances': {
    get: {
      method: LookupController.searchSubstances,
    },
  },
};
