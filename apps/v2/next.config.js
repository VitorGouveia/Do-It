const withImages = require("next-images");

const __isGithub__ = process.env.GH_PAGES === "true";
const projectName = "Notely";

/** @type {import('next').NextConfig} */
const nextConfig = withImages({
  reactStrictMode: true,

  fileExtensions: ["jpg", "jpeg", "png", "gif"],

  basePath: __isGithub__ ? `/${projectName}` : "",
  assetPrefix: __isGithub__ ? `/${projectName}/` : "",
  esModule: true,
  dynamicAssetPrefix: true,

  images: {
    disableStaticImages: true,
  },
});

module.exports = nextConfig;
