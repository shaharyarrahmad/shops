import {Component, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {ExtendedProduct} from '../vendure/types/extended-product';

@Component({
  selector: 'app-products',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent implements OnInit {

  products: ExtendedProduct[];

  constructor(private vendureService: VendureService) {
  }

  async ngOnInit(): Promise<void> {
    this.products = await this.vendureService.getProducts();
  }

  load(img: any, imgSrc: string): void {
    if (img.loaded) {
      return;
    }
    img.src = imgSrc;
    img.loaded = true;
  }

}
