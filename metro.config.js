const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const baseConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    ...baseConfig.resolver,
    sourceExts: [...baseConfig.resolver.sourceExts, 'mjs'],
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'styled-components') {
        return {
          type: 'sourceFile',
          filePath: path.resolve(
            __dirname,
            'node_modules/styled-components/native/dist/styled-components.native.cjs.js'
          ),
        };
      }
      return context.resolveRequest
        ? context.resolveRequest(context, moduleName, platform)
        : require('metro-resolver').resolve(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(baseConfig, config);
