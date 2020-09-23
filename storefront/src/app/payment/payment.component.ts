import {Component, OnDestroy, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {Order} from '../../generated/graphql';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  order: Order;
  orderSubscription: Subscription;

  constructor(private vendureService: VendureService) {
  }

  async ngOnInit(): Promise<void> {
    this.orderSubscription = this.vendureService.activeOrder$.subscribe(order => this.order = order);
    const states = await this.vendureService.getNextOrderStates();
    if (states?.indexOf('ArrangingPayment') > -1) {
      console.log(states);
      await this.vendureService.transitionOrderToState('ArrangingPayment');
    }
    await this.vendureService.transitionOrderToState('PaymentSettled');
    console.log(await this.vendureService.getNextOrderStates());
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
