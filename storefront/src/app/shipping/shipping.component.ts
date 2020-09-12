import { Component, OnInit } from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {ShippingMethodQuote} from '../../generated/graphql';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  methods: ShippingMethodQuote[];

  constructor(private vendureService: VendureService) { }

  async ngOnInit(): Promise<void> {
    this.methods = await this.vendureService.getEligibleShippingMethods();
  }

}
