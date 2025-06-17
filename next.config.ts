import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  // Configurar puerto por defecto (se puede sobreescribir con variable de entorno)
  async rewrites() {
    return [];
  },
};

export default nextConfig;
