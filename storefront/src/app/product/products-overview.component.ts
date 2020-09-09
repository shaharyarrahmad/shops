import {Component, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {Product} from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent implements OnInit {

  products: Product[]

  constructor(private vendureService: VendureService) {
  }

  async ngOnInit(): Promise<void> {
    this.products = await this.vendureService.getProducts();
  }

}
