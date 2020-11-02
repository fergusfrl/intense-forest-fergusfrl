'use strict';
const axios = require('axios');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterCreate: async () => {
      await axios.post(strapi.config.get('staticWebsiteBuildURL'));
    }
  }
};
