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
};

const workboxConfig = {
  workbox: {
    registerSW: true,
    importWorkboxFrom: 'local',
    precacheManifest: true,
  }
};

const manifestConfig = {
  manifest: {
    icons: {
      src: './static/pwa-icon.png',
      cache: true,
    },
  },
};

module.exports = withManifest(withWorkbox(withBundleAnalyzer({
  exportPathMap() {
    return {
      '/': { page: '/' },
    };
  },
  ...bundleAnalyzerConfig,
  ...workboxConfig,
  ...manifestConfig,
})));
