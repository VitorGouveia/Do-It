const __isGithub__ = process.env.GH_PAGES === "true";

const projectName = "Notely";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  basePath: __isGithub__ ? `/${projectName}` : "",
  assetPrefix: __isGithub__ ? `/${projectName}/` : "",
};

module.exports = nextConfig;
