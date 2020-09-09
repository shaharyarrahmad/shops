import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {VendureService} from '../vendure/vendure.service';
import {Events} from '../vendure/events';
import {Order} from '../order/order';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss']
})
export class CartHeaderComponent implements OnInit {

  nrOfItems = 0;

  constructor(private vendureService: VendureService, private location: Location) {
    this.vendureService.orderEvents.addListener(Events.ORDER_CHANGED, (order: Order) => {
      this.setNrOfItems(order);
    });
  }

  async ngOnInit(): Promise<void> {
    const order = await this.vendureService.getActiveOrder();
    this.setNrOfItems(order);
  }

  setNrOfItems(order: Order): void {
    if (order) {
      this.nrOfItems = order.lines
        .map(l => l.quantity)
        .reduce((quantity1, quantity2) => quantity1 + quantity2);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
