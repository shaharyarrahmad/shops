import { Channel, Order, RequestContext, Zone } from '@vendure/core';
import { TaxZoneStrategy } from '@vendure/core/dist/config/tax/tax-zone-strategy';

export class DefaultTaxZoneStrategy implements TaxZoneStrategy {
  determineTaxZone(
    ctx: RequestContext,
    zones: Zone[],
    channel: Channel,
    order?: Order
  ): Zone {
    return channel.defaultTaxZone;
  }
}
