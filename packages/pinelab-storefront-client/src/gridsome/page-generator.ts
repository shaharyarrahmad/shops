import {GET_PRODUCTS} from './gridsome.queries';
import {Product} from '../';
import {GridsomeResult} from '../';
import {PageMap} from '../';

export class PageGenerator {

    constructor(private pages: PageMap) {
    }

    // @ts-ignore
    async createPages({createPage, graphql}) {
        const {data: {Vendure: {products: {items: products}}}}: GridsomeResult<{ items: Product[] }> = await graphql(GET_PRODUCTS);
        createPage({
            path: this.pages.home.slug,
            component: this.pages.home.template,
            context: {
                products,
            }
        });
    }
}