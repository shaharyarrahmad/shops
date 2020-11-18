import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {VendureService} from '../vendure/vendure.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Order} from '../../generated/graphql';
import {Subscription} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss']
})
export class CartHeaderComponent implements OnInit, OnDestroy {

  nrOfItems = 0;
  order: Order;
  hideCart = false;
  orderSubscription: Subscription;
  progress = 0;
  previous: string | undefined;
  showNext = false;

  constructor(private vendureService: VendureService,
              private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.orderSubscription = this.vendureService.activeOrder$.subscribe(o => {
      this.setNrOfItems(o);
      this.order = o;
    });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => route.firstChild),
        switchMap(route => route.data))
      .subscribe(data => {
        this.previous = data.previous;
        this.progress = data.progress;
        this.hideCart = data.hideCart;
        this.showNext = data.showNext;
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
    // this.location.back();
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
