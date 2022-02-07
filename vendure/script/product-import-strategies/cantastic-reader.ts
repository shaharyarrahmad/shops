import {
  CsvToProductFn,
  ImportableOption,
  ImportableProduct,
  ImportableVariant,
  slugify,
} from '../import-products';

export const cantasticReader: CsvToProductFn = (csvRows: CantasticRow[]) => {
  const variantsPerProduct = new Map<string, ImportableVariant[]>();
  csvRows.forEach((row, index) => {
    if (!row.Naam || !row.Naam.trim()) {
      throw Error(`No Naam found for row ${index}: ${JSON.stringify(row)}`);
    }
    const existingVariants = variantsPerProduct.get(row.Naam) || [];
    const options = parseAttributes(row.Attributen);
    const variantName = `${row.Naam} ${options
      .map((o) => o.value)
      .join(' ')}`.trim();
    const stock = Number(row['Vrije voorraad']);
    if (isNaN(stock)) {
      throw Error(`No stock defined for ${row.Naam}`);
    }
    const price = Number(row.Verkoopprijs);
    if (isNaN(price)) {
      throw Error(`No price defined for ${row.Naam}`);
    }
    existingVariants.push({
      name: variantName,
      options,
      sku: row.Productcode,
      stock,
      price,
    });
    variantsPerProduct.set(row.Naam, existingVariants);
  });
  const products: ImportableProduct[] = [];
  // @ts-ignore
  for (const [key, value] of variantsPerProduct.entries()) {
    products.push({
      name: key,
      slug: slugify(key),
      variants: value,
      description: '<p></p>',
    });
  }
  return products;
};

function parseAttributes(attributeString: string): ImportableOption[] {
  if (!attributeString || !attributeString.trim()) {
    return [];
  }
  const attributes = attributeString.split('|');
  const options: ImportableOption[] = [];
  attributes.forEach((attribute) => {
    let [optionName, ...optionValues] = attribute.split(':');
    optionName = optionName.trim();
    const optionValue = optionValues.join(':').trim();
    if (!optionName || !optionValue || optionName === 'large_number') {
      return;
    }
    options.push({
      name: optionName,
      value: optionValue,
    });
  });
  return options;
}

export interface CantasticRow {
  Naam: string;
  Productcode: string; // sku
  Attributen: string; // Color: Black / Grey, Maroon Red / Navy Blue|large_number: 8020
  'Vrije voorraad': string;
  'Totale voorraad': string;
  Verkoopprijs: string;
  Belastingspercentage: string | undefined;
  Cantastic: '1' | '0';
  'Cantastic TEST': '1' | '0';
}
