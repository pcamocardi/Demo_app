const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Exclude the Demo_App subdirectory from Metro's module resolution
    blockList: [/Demo_App\/.*/],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
