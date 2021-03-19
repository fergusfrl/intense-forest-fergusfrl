
const getServiceAccount = (base64EncodedServiceAccount) => {
  const buff = Buffer.from(base64EncodedServiceAccount, 'base64');
  const serviceAccount = JSON.parse(buff.toString('utf-8'));
  return serviceAccount;
};

module.exports = ({ env }) => ({
  upload: {
    provider: 'google-cloud-storage',
    providerOptions: {
      bucketName: env('GCP_BUCKET_NAME'),
      baseUrl: env('GCP_BASE_URL'),
      serviceAccount: getServiceAccount(env('GCP_SERVICE_ACCOUNT'))
    },
  },
});