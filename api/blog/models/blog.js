'use strict';
const axios = require('axios');
const firebase = require('firebase');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

firebase.initializeApp({
  apiKey: process.env.GCP_API_KEY,
  projectId: process.env.GCP_PROJECT_ID,
  // databaseURL: process.env.GCP_DATABASE_URL,
});

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
const database = admin.firestore();

const triggerBuildHook = async item => {
  if (item.published_at !== null) {
    await axios.post(strapi.config.get('staticWebsiteBuildURL') || process.env.NETLIFY_BUILD_HOOK, {});
  }
};

const handleCreateUpdate = async item => {
  triggerBuildHook(item);
  if (item.finalized) {
    const subscribers = database.collection('subscribers').get();
    subscribers.forEach(sub => {
      const email = sub.get('email');
      sgMail.send({
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
