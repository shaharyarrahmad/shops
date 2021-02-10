import {Injectable} from '@nestjs/common';
import {
    EventBus,
    Order,
    OrderStateTransitionEvent,
    ProductVariant,
    RequestContext,
    TransactionalConnection
} from '@vendure/core';
import {filter} from 'rxjs/operators';
import {SendcloudClient} from './sendcloud.client';
import {SendcloudPlugin} from './sendcloud.plugin';
import {toParcelInput} from './sendcloud.adapter';
import {Parcel} from './types/sendcloud-api-response.types';

@Injectable()
export class SendcloudService {

    client: SendcloudClient;

    constructor(private eventBus: EventBus, private connection: TransactionalConnection) {
        this.client = new SendcloudClient(SendcloudPlugin.options.publicKey, SendcloudPlugin.options.secret);
        this.eventBus.ofType(OrderStateTransitionEvent)
            .pipe(filter(event => event.toState === 'PaymentSettled'))
            .subscribe(event => this.syncToSendloud(event.ctx, event.order)
                .catch(e => console.error(`Failed to sync order ${event.order.code} to SendCloud`, e))
            );
    }

    async syncToSendloud(ctx: RequestContext, order: Order): Promise<Parcel> {
        const variantIds = order.lines.map(l => l.productVariant.id);
        const variants = await this.connection.findByIdsInChannel(ctx, ProductVariant, variantIds, ctx.channelId, {relations: ['product']});
        return this.client.createParcel(toParcelInput(order, variants));
    }


}