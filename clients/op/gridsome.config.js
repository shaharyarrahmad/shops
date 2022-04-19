// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

if (process.env.VENDURE_ENV === 'local') {
  process.env.GRIDSOME_VENDURE_API = process.env.GRIDSOME_VENDURE_API_LOCAL;
}

module.exports = {
  siteName: 'Het boek',
  siteUrl: 'https://ophetboek.nl',
  configureWebpack: {
    resolve: {
      symlinks: false, //npm link
    },
  },
  plugins: [
    {
      use: '@gridsome/source-graphql',
      options: {
        url: process.env.GRIDSOME_VENDURE_API,
        fieldName: 'Vendure',
        headers: {
          'vendure-token': process.env.GRIDSOME_VENDURE_TOKEN,
        },
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
    },
  ],
};
