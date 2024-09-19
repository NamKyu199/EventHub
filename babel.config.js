module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          // This has to be mirrored in tsconfig.json
          '^~(.+)': './src/\\1',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js'
        ],
      },
    ],
  ],
     // - Add this -

};