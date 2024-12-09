module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '~root': '.',
          '~src': './src',
          '~assets': './src/assets',
          '~types': './src/types',
          '~components': './src/components',
          '~constants': './src/constants',
          '~libs': './src/libs',
          '~redux': './src/redux',
          '~routes': './src/routes',
          '~screens': './src/screens',
          '~utils': './src/utils',
        },
      },
    ],
  ],
};
