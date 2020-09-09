import {Component, Input, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {Product, Variant} from './product';
import {ActivatedRoute} from '@angular/router';
import {CartHeaderComponent} from '../cart/cart-header.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id: string;
  product: Product;
  variant: Variant;

  constructor(private route: ActivatedRoute, private vendureService: VendureService) {
    this.id = this.route.snapshot.params.id;
  }

  async ngOnInit(): Promise<void> {
    this.product = await this.vendureService.getProduct(this.id);
    this.variant = this.product.variants[0];
  }

  selectVariant(variantId: string): void {
    this.variant = this.product.variants.find(v => v.id === variantId);
  }

  async buy(): Promise<void> {
    // TODO: feedback about failure or not
    await this.vendureService.addToCart(this.variant.id, 1);
  }

}
