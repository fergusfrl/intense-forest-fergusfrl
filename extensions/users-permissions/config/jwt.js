module.exports = ({ env }) => ({
  jwtSecret: env('JWT_SECRET') || 'cb0d3786-f78b-493e-ade9-460198471c55'
});