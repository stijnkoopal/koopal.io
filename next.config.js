const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withWorkbox = require('next-workbox')

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
    importWorkboxFrom: 'local',
    precacheManifest: true,
  },
}

const nextConfig = {
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' },
      '/resume': { page: '/resume' },
      '/resume-summary': { page: '/resume-summary' },
      '/wall': { page: '/wall' },
    }
  },
}

const config = {
  ...nextConfig,
  ...bundleAnalyzerConfig,
  ...workboxConfig,
}

module.exports = withWorkbox(withBundleAnalyzer(config))
