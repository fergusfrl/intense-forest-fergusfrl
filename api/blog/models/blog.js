'use strict';
const axios = require('axios');

const triggerBuildHook = async item => {
  console.log('PUBLISHED_AT:', item.published_at);
  if (item.published_at !== null) {
    await axios.post(
      strapi.config.get('staticWebsiteBuildURL') || process.env.NETLIFY_BUILD_HOOK, {});
  }
};

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
module.exports = {
  lifecycles: {
    afterCreate: triggerBuildHook,
    afterUpdate: triggerBuildHook,
    afterDelete: triggerBuildHook,
  }
};
