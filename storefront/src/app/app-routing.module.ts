import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsOverviewComponent} from './product/products-overview.component';
import {ProductDetailComponent} from './product/product-detail.component';
import {CartComponent} from './cart/cart.component';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';
import {ShippingComponent} from './shipping/shipping.component';
import {PaymentComponent} from './payment/payment.component';
import {OrderComponent} from './order/order.component';

const routes: Routes = [
  {path: '', component: ProductsOverviewComponent},
  {
    path: 'product/:slug', component: ProductDetailComponent,
    data: {previous: '/'}
  },
  {
    path: 'cart', component: CartComponent, data: {
      previous: '/',
      hideCart: true,
      showNext: true
    }
  },
  {
    path: 'customer-details', component: CustomerDetailsComponent,
    data: {
      progress: 33,
      previous: 'cart',
      hideCart: true,
    }
  },
  {
    path: 'shipping', component: ShippingComponent, data: {
      progress: 66,
      previous: 'customer-details',
      hideCart: true,
    }
  },
  {
    path: 'payment', component: PaymentComponent, data: {
      progress: 90,
      previous: 'shipping',
      hideCart: true
    }
  },
  {
    path: 'order/:code', component: OrderComponent, data: {
      previous: '/',
      hideCart: true
    }
  },
  {path: ':collection', component: ProductsOverviewComponent, data: {previous: '/'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
