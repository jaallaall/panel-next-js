/** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa");
// const runtimeCaching = require("next-pwa/cache");
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  // trailingSlash: true,
  i18n,
  images: {
    domains: ["https://flagcdn.com/w20/"],
  },
};
