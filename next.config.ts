import type { NextConfig } from "next";

const apiOrigin = (process.env.CONCURSEIRO_API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const webOrigin = (process.env.NEXT_PUBLIC_WEB_URL || "").replace(/\/$/, "");
const isProductionDeployment = process.env.CONCURSEIRO_DEPLOYMENT === "production";
const imageHosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTNAMES || "images.unsplash.com")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

function assertProductionUrl(name: string, value: string) {
  if (!value) {
    throw new Error(`${name} is required when CONCURSEIRO_DEPLOYMENT=production.`);
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute URL.`);
  }

  if (url.protocol !== "https:") {
    throw new Error(`${name} must use HTTPS in production.`);
  }
}

if (isProductionDeployment) {
  assertProductionUrl("CONCURSEIRO_API_URL", apiOrigin);
  assertProductionUrl("NEXT_PUBLIC_WEB_URL", webOrigin);
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

if (isProductionDeployment) {
  securityHeaders.push(
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    {
      key: "Content-Security-Policy",
      value: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "form-action 'self'",
        "script-src 'self' 'unsafe-inline' https://apis.google.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://apis.google.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebaseinstallations.googleapis.com",
        "frame-src https://*.firebaseapp.com https://accounts.google.com",
      ].join("; "),
    },
  );
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: imageHosts.map((hostname) => ({ protocol: "https", hostname })),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    if (!apiOrigin) return [];

    return [
      {
        source: "/api/backend/:path*",
        destination: `${apiOrigin}/:path*`,
      },
    ];
  },
};

export default nextConfig;
