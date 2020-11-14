module.exports = {
  upload: {
    provider: 'google-cloud-storage',
    providerOptions: {
      bucketName: process.env.GCP_BUCKET_NAME,
      baseUrl: process.env.GCP_BASE_URL,
      serviceAccount: process.env.GCP_SERVICE_ACCOUNT,
    },
  },
}