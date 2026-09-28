import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cuxvfekclhdlsidayxnr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // صور Cloudinary (رفع الصور من لوحة الإدارة)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
