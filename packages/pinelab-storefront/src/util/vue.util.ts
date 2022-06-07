/**
 * Format Vendure's integer (1233) to euro format: €12,33
 */
export function formatEuro(value?: number) {
  if (!value) {
    value = 0;
  }
  const currencyString =
    value < 0
      ? `- €${Math.abs(value / 100)
        .toFixed(2)
        .replace('.', ',')}`
      : `€${(value / 100).toFixed(2).replace('.', ',')}`;
  if (currencyString.endsWith('00')) {
    return currencyString.replace(new RegExp('00$'), '-');
  }
  return currencyString;
}