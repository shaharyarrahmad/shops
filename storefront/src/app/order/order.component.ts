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
  code: string;
  error: string;

  constructor(private vendureService: VendureService, private route: ActivatedRoute) {
    this.code = this.route.snapshot.params.code;
  }

  async ngOnInit(): Promise<void> {
    let pollingCount = 0;
    try {
      while (this.order?.state !== 'PaymentSettled') {
        if (pollingCount > 10) {
          this.error = 'Er is iets misgegaan, neem contact met ons op.';
          break;
        }
        this.order = await this.vendureService.getOrderByCode(this.code);
        await new Promise(resolve => setTimeout(resolve, 1000));
        pollingCount++;
        console.log(`Polling for payment status ${pollingCount}`);
      }
    } catch (e) {
      this.error = e.message;
    }

  }



/*  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }*/

}
