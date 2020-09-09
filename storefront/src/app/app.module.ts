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

@NgModule({
  declarations: [
    AppComponent,
    ProductsOverviewComponent,
    EuroPipe,
    ProductDetailComponent,
    CartHeaderComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [VendureService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
