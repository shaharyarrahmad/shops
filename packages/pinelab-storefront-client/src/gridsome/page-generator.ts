import {GET_PRODUCTS} from './gridsome.queries';
import {PageMap} from './page-map';

export class PageGenerator {

    constructor(private pages: PageMap) {
    }

    // @ts-ignore
    async createPages({createPage, graphql}) {
        const {data: {Vendure: {products}}} = await graphql(GET_PRODUCTS);
        console.log('DATA', products);
        createPage({
            path: this.pages.home.slug,
            component: this.pages.home.template,
            context: {
                products,
            }
        });
    }
}