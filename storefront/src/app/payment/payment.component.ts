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
  error: string;

  constructor(private vendureService: VendureService) {
  }

  async ngOnInit(): Promise<void> {
    this.orderSubscription = this.vendureService.activeOrder$.subscribe(o => this.order = o);
    const states = await this.vendureService.getNextOrderStates();
    if (states?.indexOf('ArrangingPayment') > -1) {
      await this.vendureService.transitionOrderToState('ArrangingPayment');
    }
    const order = await this.vendureService.addPaymentToOrder({method: 'mollie-payment-handler', metadata: {}});
    const latestPayment = order.payments?.[order.payments.length - 1];
    if (latestPayment?.metadata?.redirectLink) {
      window.location.href = latestPayment.metadata.redirectLink;
    } else {
      this.error = latestPayment.errorMessage;
      console.error('Error creating payment', this.error);
    }
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
