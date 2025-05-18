/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  images: {
    domains: ["spotx-uploads.s3.eu-central-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
