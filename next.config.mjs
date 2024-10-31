/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "staging.audiomediagrading.com",
      },
      {
        protocol: "https",
        hostname: "staging.audiomediagrading.com%20",
      },
      {
        protocol: "https",
        hostname: "store.audiomediagrading.com",
      },
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
      },
    ],
  },
};

export default nextConfig;
