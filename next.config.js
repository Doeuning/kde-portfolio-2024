/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["localhost", "*", "www.dummyimage.com"],
  },
};

module.exports = nextConfig;
