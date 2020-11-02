module.exports = ({ env }) => ({
  staticWebsiteBuildURL: env(NETLIFY_BUILD_HOOK),
});
