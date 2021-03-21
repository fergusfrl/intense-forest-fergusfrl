'use strict';
const axios = require('axios');

const triggerBuildHook = async item => {
  if (item.published_at !== null) {
    await axios.post(strapi.config.get('staticWebsiteBuildURL') || process.env.NETLIFY_BUILD_HOOK, {});
  }
};

const handleCreateUpdate = async item => {
  triggerBuildHook(item);
  if (item.finalized) {
    const subscribers = await strapi.firebase
      .firestore()
      .collection('subscribers')
      .get();

    subscribers.forEach(sub => {
      const email = sub.get('email');
      strapi.sendGrid.send({
        to: email,
        from: process.env.SEND_GRID_FROM_EMAIL,
        templateId: process.env.SEND_GRID_TEMPLATE_ID,
        dynamicTemplateData: {
          blogTitle: item.title,
          blogSubtitle: item.blurb,
        },
      });
    });
  }
};

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
module.exports = {
  lifecycles: {
    afterCreate: handleCreateUpdate,
    afterUpdate: handleCreateUpdate,
    afterDelete: triggerBuildHook,
  }
};
