import { Channel, Logger, Order, RequestContext, Zone } from '@vendure/core';
import { TaxZoneStrategy } from '@vendure/core/dist/config/tax/tax-zone-strategy';

const loggerCtx = 'TaxZoneStrategy';

export class ShippingBasedTaxZoneStrategy implements TaxZoneStrategy {
  determineTaxZone(
    ctx: RequestContext,
    zones: Zone[],
    channel: Channel,
    order?: Order
  ): Zone {
    const countryCode = order?.shippingAddress?.countryCode;
    if (order && countryCode) {
      const zone = zones.find((zone) =>
        zone.members?.find(
          (member) => member.code === countryCode)
      );
      if (zone) {
        Logger.info(`Setting tax-zone ${zone.name} for order ${order.code} with countryCode ${countryCode}`, loggerCtx);
        return zone;
      }
      Logger.info(`No taxzone found for country ${countryCode}. Setting default ${channel.defaultTaxZone.name} for order ${order.code}`, loggerCtx);
    }
    return channel.defaultTaxZone;
  }
}
