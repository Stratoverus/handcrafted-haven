import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    domains: [
      "hglnbjxvpxtjcwkj.public.blob.vercel-storage.com", // Add your external host here
      // Add more domains if needed
    ],
  },
};

export default nextConfig;
