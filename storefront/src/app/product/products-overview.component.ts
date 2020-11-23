import {Component, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {ExtendedProduct} from '../vendure/types/extended-product';
import {Collection, ProductVariant} from '../../generated/graphql';
import {ActivatedRoute} from '@angular/router';
import {setCollectionInStorage} from '../collection/collection.helper';

@Component({
  selector: 'app-products',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent implements OnInit {

  products: ExtendedProduct[];
  collections: Collection[];
  collectionName: string;
  collection: Collection;

  constructor(private vendureService: VendureService, private route: ActivatedRoute) {
    this.collectionName = this.route.snapshot.params.category;
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.collectionName = params.get('collection');
      setCollectionInStorage(this.collectionName);
      this.loadProducts();
    });
  }

  async loadProducts(): Promise<void> {
    if (this.collectionName) {
      [this.products, this.collection] = await this.vendureService.getProductsForCollection(this.collectionName);
    } else {
      [this.products, this.collections] = await Promise.all([
        this.vendureService.getProducts(),
        this.vendureService.getCollections()
      ]);
    }
  }

}
