import {Component, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {ExtendedProduct} from '../vendure/types/extended-product';
import {Collection} from '../../generated/graphql';

@Component({
  selector: 'app-products',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent implements OnInit {

  products: ExtendedProduct[];
  collections: Collection[];

  constructor(private vendureService: VendureService) {
  }

  async ngOnInit(): Promise<void> {
    [this.products, this.collections] = await Promise.all([
      this.vendureService.getProducts(),
      this.vendureService.getCollections()
    ]);
    console.log(this.collections)
  }

}
