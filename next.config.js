const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  images: {
    domains: [
      "ngabroadimages.s3.eu-west-2.amazonaws.com",
      "naijagoingabroad.com.ng",
      "cdn.naijagoingabroad.com"
    ],
  },
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

//const images = () => ();

module.exports = withPlugins(
  [
    // add a plugin with specific configuration
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          runtimeCaching,
          //         disable: true,
          disable: process.env.NODE_ENV === "development",
        },
      },
    ],

    // add a plugin without a configuration
    redirects,
  ],
  nextConfig
);
