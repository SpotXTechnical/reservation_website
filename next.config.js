/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    reactStrictMode: false
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
