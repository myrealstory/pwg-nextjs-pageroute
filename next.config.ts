/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  experimental: {
    turbo: true, // Enable TurboPack
  },
  webpack(config: { module: { rules: { test: RegExp; use: string[]; }[]; }; }) {
      config.module.rules.push({
          test: /\.svg$/,
          use: ["@svgr/webpack"],
      });
      return config;
  },
  images: {
      remotePatterns: [
      {
          protocol: "https",
          hostname: "**"
      }
      ]
  },
};

module.exports = nextConfig;
