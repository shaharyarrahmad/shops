import {Component, OnDestroy, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {Order, ShippingMethodQuote} from '../../generated/graphql';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit, OnDestroy {

  methods: ShippingMethodQuote[];
  order: Order;
  orderSubscription: Subscription;

  constructor(private vendureService: VendureService) { }

  async ngOnInit(): Promise<void> {
    this.methods = await this.vendureService.getEligibleShippingMethods();
    const states = await this.vendureService.getNextOrderStates();
    if (states?.indexOf('AddingItems') > -1) {
      await this.vendureService.transitionOrderToState('AddingItems');
    }
    this.orderSubscription = this.vendureService.activeOrder$.subscribe(order => this.order = order);
  }

  async select(shippingId: string): Promise<void> {
    await this.vendureService.setOrderShippingMethod(shippingId);
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
