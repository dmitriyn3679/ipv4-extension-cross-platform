const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  const currentBrowser = process.env.REACT_APP_BROWSER_CORE || "chrome";
  const buildPatterns = {
    chrome: {
      from: 'public/chrome',
      to: ''
    },
    
    firefox: {
      from: 'public/firefox',
      to: '',
    },
    opera: {
      from: 'public/opera',
      to: '',
    }
  }

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        buildPatterns[currentBrowser],
      ],
    })
  );
  
  return config;
};
