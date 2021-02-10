import {Injectable} from '@nestjs/common';
import {EventBus, Order, OrderStateTransitionEvent} from '@vendure/core';
import {filter} from 'rxjs/operators';
import {SendcloudClient} from './sendcloud.client';
import {SendcloudPlugin} from './sendcloud.plugin';

@Injectable()
export class SendcloudService {

    client: SendcloudClient;

    constructor(private eventBus: EventBus) {
        this.client = new SendcloudClient(SendcloudPlugin.options.publicKey, SendcloudPlugin.options.secret);
        this.eventBus.ofType(OrderStateTransitionEvent)
            .pipe(filter(event => event.toState === 'PaymentSettled'))
            .subscribe(event => this.syncToSendloud(event.order)
                .catch(e => console.error(`Failed to sync order ${event.order.code} to SendCloud`, e))
            );
    }

    async syncToSendloud(order: Order): Promise<void> {
        console.log(JSON.stringify(order));
        const parcel = await this.client.createParcel({
            "name": "Rob van den Heuvel",
            "company_name": "Sendcloud",
            "address": "Insulindelaan",
            "house_number": "115",
            "city": "Eindhoven",
            "postal_code": "5642CV",
            "country": "NL",
            "telephone": "+31612345678",
            "request_label": false,
            "email": "rob@sendcloud.nl",
            "order_number": "1234567890",
            "parcel_items": [
                {
                    "description": "T-Shirt",
                    "quantity": 2,
                    "weight": "0.3",
                    "sku": "sku1",
                    "value": "300",
                    "properties": {
                        "Size": "Medium",
                        "Color": "Blue"
                    }
                },
                {
                    "description": "Trousers",
                    "quantity": 1,
                    "weight": "0.3",
                    "sku": "sku2",
                    "value": "100",
                    "properties": {
                        "Size": "58",
                        "Color": "Black"
                    }
                }
            ]
        });
        console.log(`DOE DAN`, JSON.stringify(parcel));
    }


}