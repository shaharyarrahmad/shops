import { Component, OnInit } from '@angular/core';
import {VendureService} from '../vendure/vendure.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private vendureService: VendureService) {
  }

  ngOnInit(): void {
  }

}
