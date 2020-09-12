import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateAddressInput, CreateCustomerInput} from '../../generated/graphql';
import {VendureService} from '../vendure/vendure.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(private vendureService: VendureService, private router: Router) { }

  async submit(event): Promise<void> {
    event.preventDefault();
    const customer: CreateCustomerInput = {
      emailAddress: event.target.email.value,
      firstName: event.target.firstname.value,
      lastName: event.target.lastname.value,
      phoneNumber: event.target.phonenumber.value,
    };
    const address: CreateAddressInput = {
      company: event.target.company.value,
      fullName: `${customer.firstName} ${customer.lastName}`,
      defaultBillingAddress: true,
      defaultShippingAddress: true,
      city: event.target.city.value,
      phoneNumber: customer.phoneNumber,
      countryCode: event.target.country.value,
      streetLine1: event.target.street.value,
      streetLine2: event.target.housenr.value,
      postalCode: event.target.postalcode.value,
    };
    await this.vendureService.setCustomerForOrder(customer);
    await this.vendureService.setOrderShippingAddress(address);
    await this.router.navigateByUrl('shipping');
  }

  ngOnInit(): void {
  }

}
