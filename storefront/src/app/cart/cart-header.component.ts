import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {VendureService} from '../vendure/vendure.service';
import {NavigationStart, Router} from '@angular/router';
import {Order} from '../../generated/graphql';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss']
})
export class CartHeaderComponent implements OnInit, OnDestroy {

  nrOfItems = 0;
  order: Order;
  isCheckout = false;
  hideCart = false;
  orderSubscription: Subscription;
  progress = 0;

  constructor(private vendureService: VendureService, private location: Location, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.orderSubscription = this.vendureService.activeOrder$.subscribe(o => {
      this.setNrOfItems(o);
      this.order = o;
    });
    this.router.events.subscribe(event => {
      if ((event as NavigationStart).url) {
        this.progress = 0;
        if ((event as NavigationStart).url?.indexOf('/customer-details') > -1) {
          this.progress = 33;
        } else if ((event as NavigationStart).url?.indexOf('/shipping') > -1) {
          this.progress = 66;
        }
        this.isCheckout = (event as NavigationStart).url?.indexOf('/cart') > -1;
        this.hideCart = (event as NavigationStart).url?.indexOf('/customer-details') > -1 || (event as NavigationStart).url?.indexOf('/shipping') > -1;
      }
    });
  }

  setNrOfItems(order: Order): void {
    if (order && order.lines.length > 0) {
      this.nrOfItems = order.lines
        .map(l => l.quantity)
        .reduce((quantity1, quantity2) => quantity1 + quantity2);
    } else {
      this.nrOfItems = 0;
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
