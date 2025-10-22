module.exports = {
  apps: [
    {
      name: "rapid-frontend",
      script: "build/index.js",
      env_development: {
        NODE_ENV: "development",
        PORT: 4001,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 4002,
      },
    },
  ],
};
