/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
};
 
module.exports = withNextIntl(nextConfig);
