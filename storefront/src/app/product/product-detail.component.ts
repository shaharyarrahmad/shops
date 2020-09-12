import {Component, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {ActivatedRoute} from '@angular/router';
import {ExtendedProduct} from '../vendure/types/extended-product';
import {ProductVariant} from '../../generated/graphql';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id: string;
  product: ExtendedProduct;
  variant: ProductVariant;

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
    await this.vendureService.addProduct(this.variant.id, 1);
  }

}
