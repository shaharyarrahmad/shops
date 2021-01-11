const config = require('shared-components/config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer/lib/BundleAnalyzerPlugin');
// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/
// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


module.exports = async function (api) {
    api.loadSource(({addCollection}) => {
        // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    })

    api.createPages(async ({createPage, graphql}) => {
        await config.createPages(createPage, graphql);
    })

/*    api.chainWebpack(config => {
        config
            .plugin('BundleAnalyzerPlugin')
            .use(BundleAnalyzerPlugin, [{analyzerMode: 'static'}])
    })*/

}
