/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
    
}
