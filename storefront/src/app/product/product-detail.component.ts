import {Component, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {ActivatedRoute} from '@angular/router';
import {ExtendedProduct} from '../vendure/types/extended-product';
import {Asset, ProductVariant} from '../../generated/graphql';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  slug: string;
  product: ExtendedProduct;
  variant: ProductVariant;
  assets: Asset[];
  asset: Asset;
  soldOut = false;

  constructor(private route: ActivatedRoute, private vendureService: VendureService) {
    this.slug = this.route.snapshot.params.slug;
  }

  async ngOnInit(): Promise<void> {
    this.product = await this.vendureService.getProduct(this.slug);
    this.selectVariant(this.product.variants[0].id);
    this.setAssets();

  }

  selectVariant(variantId: string): void {
    this.variant = this.product.variants.find(v => v.id === variantId);
    this.soldOut = this.variant.available <= 0;
    this.setAssets();
  }

  setAssets(): void {
    if (this.variant.assets?.length > 1) {
      this.assets = this.variant.assets?.slice(0, 5);
    } else {
      this.assets = this.product.assets?.slice(0, 5);
    }
    this.setCurrentAsset();
  }

  setCurrentAsset(asset?: Asset): void {
    this.asset = asset || this.variant?.featuredAsset || this.product?.featuredAsset;
  }

  async buy(): Promise<void> {
    // TODO: feedback about failure or not
    await this.vendureService.addProduct(this.variant.id, 1);
  }

}
