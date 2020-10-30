import {Component, OnDestroy, OnInit} from '@angular/core';
import {VendureService} from '../vendure/vendure.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Country} from '../vendure/types/country';
import {CreateAddressInput, CreateCustomerInput} from '../../generated/graphql';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {

  customerForm: FormGroup;
  orderSubscription: Subscription;

  constructor(private vendureService: VendureService, private router: Router, private formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      company: '',
      firstname: '',
      lastname: '',
      phonenumber: '',
      email: '',
      street: '',
      housenr: '',
      city: '',
      postalcode: '',
      country: '',
    });
  }

  ngOnInit(): void {
    this.orderSubscription = this.vendureService.activeOrder$.subscribe(order => {
      this.customerForm.patchValue({
        company: order?.shippingAddress?.company || '', // Errors when company is null
        firstname: order?.customer?.firstName,
        lastname: order?.customer?.lastName,
        phonenumber: order?.customer?.phoneNumber,
        email: order?.customer?.emailAddress,
        street: order?.shippingAddress?.streetLine1,
        housenr: order?.shippingAddress?.streetLine2,
        city: order?.shippingAddress?.city,
        postalcode: order?.shippingAddress?.postalCode,
      });
      if (order?.shippingAddress?.country) {
        this.customerForm.controls.country.setValue(Country[order?.shippingAddress?.country]);
      } else {
        this.customerForm.controls.country.setValue('nl');
      }
    });
  }

  async submit(event): Promise<void> {
    event.preventDefault();
    if (this.customerForm.invalid) {
      return this.customerForm.markAllAsTouched();
    }
    const raw = this.customerForm.getRawValue();
    const customer: CreateCustomerInput = {
      emailAddress: raw.email,
      firstName: raw.firstname,
      lastName: raw.lastname,
      phoneNumber: raw.phonenumber,
    };
    const address: CreateAddressInput = {
      company: raw.company,
      fullName: `${customer.firstName} ${customer.lastName}`,
      defaultBillingAddress: true,
      defaultShippingAddress: true,
      city: raw.city,
      phoneNumber: customer.phoneNumber,
      countryCode: raw.country,
      streetLine1: raw.street,
      streetLine2: raw.housenr,
      postalCode: raw.postalcode,
    };
    await Promise.all([
      this.vendureService.setCustomerForOrder(customer),
      this.vendureService.setOrderShippingAddress(address),
    ]);
    await this.router.navigateByUrl('shipping');
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
