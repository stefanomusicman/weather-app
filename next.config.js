/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
})

module.exports = {
  nextConfig,
  env: {
    API_KEY: "c4ee778626f5cd6222135068ec2fa634"
  }
}
