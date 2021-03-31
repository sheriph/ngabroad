const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  /* target: "serverless",
  webpack(config, { isServer, webpack }) {
    // al your config

    return config;
  }, */
};

const redirects = {
  async redirects() {
    return [
      {
        source: "/articles",
        destination: "/articles/1",
        permanent: true,
      },
    ];
  },
};

module.exports = withPlugins(
  [
    // add a plugin with specific configuration
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          runtimeCaching,
          disable: process.env.NODE_ENV === "development",
        },
      },
    ],

    // add a plugin without a configuration
    redirects,
  ],
  nextConfig
);
