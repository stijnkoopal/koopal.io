const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
require('webpack-bundle-analyzer');

module.exports = withBundleAnalyzer({
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
});
