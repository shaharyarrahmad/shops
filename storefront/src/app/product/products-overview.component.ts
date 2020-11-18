import {Component, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {ExtendedProduct} from '../vendure/types/extended-product';
import {Collection, ProductVariant} from '../../generated/graphql';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent implements OnInit {

  products: ExtendedProduct[];
  collections: Collection[];
  category: string;

  constructor(private vendureService: VendureService, private route: ActivatedRoute) {
    this.category = this.route.snapshot.params.category;
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      this.loadProducts();
    });
    // await this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    if (this.category) {
      this.products = await this.vendureService.getProductsForCollection(this.category);
    } else {
      [this.products, this.collections] = await Promise.all([
        this.vendureService.getProducts(),
        this.vendureService.getCollections()
      ]);
    }
  }

}
