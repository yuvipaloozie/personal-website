import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/blog/scaling-unet", destination: "/blog/how-cnns-learn-to-see", permanent: true }];
  },
};

export default nextConfig;
