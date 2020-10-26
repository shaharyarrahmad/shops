import {Component, OnDestroy, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {Order} from '../../generated/graphql';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  order: Order;
  orderSubscription: Subscription;
  loading = true;

  constructor(private vendureService: VendureService) {
  }

  async ngOnInit(): Promise<void> {
    this.orderSubscription = this.vendureService.activeOrder$.subscribe(order => {
      this.order = order;
      this.loading = false;
    });
  }

  async updateQuantity(lineId: string, quantity: number): Promise<void> {
    await this.vendureService.adjustOrderLine(lineId, quantity);
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
