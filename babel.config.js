module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@constants": "./src/constants",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@services": "./src/services",
          "@stores": "./src/stores",
          "@hooks": "./src/hooks",
          "@navigation": "./src/navigation",
        },
      },
    ],
  ],
};
