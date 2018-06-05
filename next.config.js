const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withWorkbox = require('next-workbox')

module.exports = withWorkbox(withBundleAnalyzer({
  exportPathMap() {
    return {
      '/': { page: '/' },
    };
  },
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
  workbox: {
    registerSW: true,
    importWorkboxFrom: 'local',
    precacheManifest: true,
  },
}));
