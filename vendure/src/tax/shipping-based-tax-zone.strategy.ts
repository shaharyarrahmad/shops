import { Channel, Logger, Order, RequestContext, Zone } from '@vendure/core';
import { TaxZoneStrategy } from '@vendure/core/dist/config/tax/tax-zone-strategy';

export class ShippingBasedTaxZoneStrategy implements TaxZoneStrategy {
  determineTaxZone(
    ctx: RequestContext,
    zones: Zone[],
    channel: Channel,
    order?: Order
  ): Zone {
    const zone = zones.find((zone) =>
      zone.members?.find(
        (member) => member.code === order?.shippingAddress?.countryCode
      )
    );

    Logger.error(`CT ${ctx.languageCode}`);

    if (zone) {
      return zone;
    }

    return channel.defaultTaxZone;
  }
}
