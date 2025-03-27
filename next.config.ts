// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Habilita o suporte nativo ao Styled Components
  },
  images: {
    domains: ["digimon-api.vercel.app"], // Permite carregar imagens do domínio da API
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
