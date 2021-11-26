import { Zone } from '@vendure/core';

export function getZonesForCountryCode(countryCode: string, zones: Zone[]) {
  const found: Zone[] = [];
  zones.forEach((zone) => {
    if (zone.members.find((member) => member.code === countryCode)) {
      found.push(zone);
    }
  });
  return found;
}
