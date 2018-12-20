const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withWorkbox = require('next-workbox')
const withManifest = require('next-manifest')

const bundleAnalyzerConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
}

const workboxConfig = {
  workbox: {
    registerSW: true,
    importWorkboxFrom: 'local',
    precacheManifest: true,
  },
}

const manifestConfig = {
  manifest: {
    themeColor: '#00413c',
    icons: {
      src: './static/koopal.me.png',
      cache: true,
    },
  },
}

const nextConfig = {
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/resume': { page: '/resume' },
      '/wall': { page: '/wall' },
    };
  },
}

const config = {
  ...nextConfig,
  ...bundleAnalyzerConfig,
  ...workboxConfig,
  ...manifestConfig,
}

module.exports = withManifest(withWorkbox(withBundleAnalyzer(config)));
