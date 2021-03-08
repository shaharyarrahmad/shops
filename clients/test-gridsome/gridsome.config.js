// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Pinelab.studio',
  configureWebpack: {
    resolve: {
      symlinks: false, //npm link
    },
  },
  plugins: [
    {
      use: '@gridsome/source-graphql',
      options: {
        url: 'https://test-api.pinelab.studio/shop-api',
        fieldName: 'Vendure',
        headers: {
          'vendure-token': 'demo',
        },
      },
    },
  ],
};
