'use strict';
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = () => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  admin.initializeApp({
    apiKey: process.env.GCP_API_KEY,
    projectId: process.env.GCP_PROJECT_ID,
    // databaseURL: process.env.GCP_DATABASE_URL,
  });

  strapi.firebase = admin;
  strapi.sendGrid = sgMail;
};
