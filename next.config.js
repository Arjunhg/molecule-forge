require('dotenv').config();

const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    }
  },
  output: "standalone",
  webpack(config, { isServer }) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/@rdkit/rdkit/dist/RDKit_minimal.wasm",
            to: "static/chunks",
          }, 
        ],
      }),
    );

    if (!isServer) {
      config.resolve.fallback = {
        fs: false, 
      };
    }

    return config;
  },
  env: {
    API_URL: "http://localhost:3000"
  }
};

module.exports = nextConfig;
