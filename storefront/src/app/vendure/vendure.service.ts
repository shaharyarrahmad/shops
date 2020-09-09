import {GraphQLClient} from 'graphql-request'
import {Product} from '../product/product';
import {activeOrderQuery, addItemToOrderMutation, productQuery, productsQuery} from './graphql.queries';
import {environment} from '../../environments/environment';
import {Globals} from '../constants';
import {Injectable} from '@angular/core';
import {Events} from 'src/app/vendure/events';
import {EventEmitter} from 'events';
import {Order} from '../order/order';

@Injectable({
  providedIn: 'root',
})
export class VendureService extends GraphQLClient {

  orderEvents = new EventEmitter();

  constructor() {
    super(environment.vendureEndpoint, {headers: {'vendure-token': Globals.channelId}, credentials: 'include'});
  }

  async getProducts(): Promise<Product[]> {
    const {products} = await this.request(productsQuery);
    return products?.items.map((p: Product) => this.setLowestPrice(p));
  }

  async getProduct(id: string): Promise<Product> {
    const {product} = await this.request(productQuery, {id});
    return this.setLowestPrice(product);
  }

  /**
   * Set lowest price based on lowest price of variants
   */
  setLowestPrice(product: Product): Product {
    product.lowestPriceIncVAT = Math.min(...product.variants.map(v => v.priceWithTax));
    return product;
  }

  async addToCart(productVariantId: string, quantity: number): Promise<Order> {
    const {addItemToOrder} = await this.request(addItemToOrderMutation, {productVariantId, quantity});
    this.orderEvents.emit(Events.ORDER_CHANGED, addItemToOrder);
    console.log(addItemToOrder);
    return addItemToOrder;
  }

  async getActiveOrder(): Promise<Order> {
    const {activeOrder} = await this.request(activeOrderQuery);
    return activeOrder;
  }

}
