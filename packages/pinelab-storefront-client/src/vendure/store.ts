import { Order, OrderFieldsFragment } from '../generated/graphql';

export class Store {
  activeOrder: OrderFieldsFragment | undefined;
}
