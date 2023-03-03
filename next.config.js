/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["localhost", "*", "www.dummyimage.com"],
  },
  async rewrites() {
    return [
      {
        source: "/daumcafe/:path*",
        destination: `https://top.cafe.daum.net/_c21_/api/v3/:path*`,
      },
      {
        source: "/moviedb/:path*",
        destination: "https://api.themoviedb.org/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
