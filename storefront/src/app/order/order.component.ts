import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../generated/graphql';
import {Subscription} from 'rxjs';
import {VendureService} from '../vendure/vendure.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  order: Order;
  orderSubscription: Subscription;
  pollingCount: number;
  code: string;

  constructor(private vendureService: VendureService, private route: ActivatedRoute) {
    this.code = this.route.snapshot.params.code;
  }

  ngOnInit(): void {
    this.pollingCount = 0;
    this.orderSubscription = this.vendureService.activeOrder$.subscribe(o => {
      this.order = o;
      if (o?.state !== 'PaymentSettled') {
        setTimeout(() => this.vendureService.getOrderByCode(this.code), 1000);
        this.pollingCount++;
      }
    });
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
