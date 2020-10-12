import {BrowserModule} from '@angular/platform-browser';
import {Input, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductsOverviewComponent} from './product/products-overview.component';
import {EuroPipe} from '../lib/euro.pipe';
import { ProductDetailComponent } from './product/product-detail.component';
import { CartHeaderComponent } from './cart/cart-header.component';
import {VendureService} from './vendure/vendure.service';
import { CartComponent } from './cart/cart.component';
import {NumberInputComponent} from './number-input/number-input.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ShippingComponent } from './shipping/shipping.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsOverviewComponent,
    EuroPipe,
    ProductDetailComponent,
    CartHeaderComponent,
    CartComponent,
    NumberInputComponent,
    CustomerDetailsComponent,
    ShippingComponent,
    PaymentComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [VendureService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
