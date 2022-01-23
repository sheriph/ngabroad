const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  images: {
    domains: [
      "ngabroadimages.s3.eu-west-2.amazonaws.com",
      "naijagoingabroad.com.ng",
      "cdn.naijagoingabroad.com",
      "www.naijagoingabroad.com.ng",
    ],
  },
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB,
    NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
    NEXT_PUBLIC_TEMPLATE_ID_CONTACT_FORM:
      process.env.NEXT_PUBLIC_TEMPLATE_ID_CONTACT_FORM,
    NEXT_PUBLIC_EMAILJS_USER_ID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
    MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_DB_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    NEXT_PUBLIC_TEMPLATE_ID_ORDER_FORM:
      process.env.NEXT_PUBLIC_TEMPLATE_ID_ORDER_FORM,
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
