import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../generated/graphql';
import {VendureService} from '../vendure/vendure.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: Order;
  pollingCount: number;
  code: string;
  error: string;

  constructor(private vendureService: VendureService, private route: ActivatedRoute) {
    this.code = this.route.snapshot.params.code;
  }

  async ngOnInit(): Promise<void> {
    this.pollingCount = 0;
    this.order = await this.vendureService.getOrderByCode(this.code);
    if (this.order?.state !== 'PaymentSettled') {
      if (this.pollingCount > 10) {
        this.error = 'Er is iets misgegaan, neem contact met ons op.';
      }
      setTimeout(() => this.vendureService.getOrderByCode(this.code)
        .then(o => this.order = o)
        .catch((e) => {
        this.error = e.message;
      }), 1000);
      this.pollingCount++;
      console.log(`Polling for payment status ${this.pollingCount}`);
    }
  }

/*  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }*/

}
