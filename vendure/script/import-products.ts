import {
  bootstrap,
  ChannelService,
  LanguageCode,
  ProductOptionGroup,
  ProductService,
  ProductVariantService,
  RequestContext,
  TaxCategoryService,
  Translated,
} from '@vendure/core';
import { CreateProductVariantInput } from '@vendure/common/lib/generated-types';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';
import * as Papa from 'papaparse';
import { ProductOptionResolver } from '@vendure/core/dist/api/resolvers/admin/product-option.resolver';
import * as path from 'path';
import { cantasticReader } from './product-import-strategies/cantastic-reader';

/**
 * Use this importer like this:
 * yarn script:test script/import-products data/cantastic.csv
 * cantastic is the channelToken and the name of the strategy that will be used
 */

export type CsvReader = (csvRows: any[]) => ImportableProduct[];

export interface ImportableProduct {
  name: string;
  slug: string;
  description: string;
  variants: ImportableVariant[];
}

export interface ImportableVariant {
  name: string;
  sku: string;
  stock: number;
  price: number;
  options: ImportableOption[];
}

export interface ImportableOption {
  name: string;
  value: string;
}

const testProduct: ImportableProduct = {
  name: 'TestProd',
  slug: 'test-slug-prod',
  description: '<p>descriptionnn</p>',
  variants: [
    {
      name: 'Loop Colors 600ml Box Deal CHROME',
      sku: 'lp-deals-600ml-436box',
      stock: 3,
      price: 2311,
      options: [{ name: 'Color', value: 'LP-436 CHROME' }],
    },
    {
      name: 'Loop Colors 600ml Box Deal ASPHALT',
      sku: 'lp-deals-600ml-435box',
      stock: 66,
      price: 6666,
      options: [{ name: 'Color', value: 'LP-43 ASPHALT' }],
    },
  ],
};

const strategies: { [key: string]: CsvReader } = {
  cantastic: cantasticReader,
};

let app: INestApplication;
(async () => {
  require('dotenv').config({ path: process.env.LOCAL_ENV });
  const filePath = process.argv[2];
  const channelToken = path.basename(filePath, '.csv');
  if (!fs.existsSync(filePath)) {
    await logAndExit(`${filePath} doesn't exists`);
  }
  const csvReader = strategies[channelToken];
  if (!csvReader) {
    await logAndExit(`No csvReader strategy defined for ${channelToken}`);
  }
  console.log(
    `Importing products from ${filePath} to channel ${channelToken} in database ${process.env.DATABASE_NAME}`
  );
  await sleep(5000); // Wait for user to read message

  // parse data
  const rows = await parse(filePath);
  const products = csvReader(rows);
  console.log(JSON.stringify(products.slice(0, 2)));

  // Import to DB
  const { config } = require('../src/vendure-config');
  app = await bootstrap(config);
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  const ctx = new RequestContext({
    channel,
    isAuthorized: true,
    apiType: 'admin',
    authorizedAsOwnerOnly: false,
  });
  const taxCategories = await app.get(TaxCategoryService).findAll(ctx);
  const defaultTaxCategoryId = taxCategories.find((tc) => tc.isDefault);
  if (!defaultTaxCategoryId) {
    await logAndExit('No default taxCategory found in DB!');
  }
  process.exit(0);
})();

/**
 * Parse local csv file
 */
function parse(fileName: string): Promise<any[]> {
  const file = fs.readFileSync(fileName);
  return new Promise((resolve) => {
    Papa.parse(file.toString(), {
      header: true,
      complete: function (results) {
        resolve(results.data);
      },
    });
  });
}

/**
 * Write product to DB
 */
async function createProduct(
  app: INestApplication,
  ctx: RequestContext,
  product: ImportableProduct,
  defaultTaxCategoryId: string
): Promise<void> {
  const productService = app.get(ProductService);
  const productOptionResolver = app.get(ProductOptionResolver);
  const variantService = app.get(ProductVariantService);
  // Create product
  const { id: productId, slug } = await productService.create(ctx, {
    enabled: true,
    translations: [
      {
        languageCode: LanguageCode.en,
        name: product.name,
        slug: product.slug,
        description: product.description,
      },
    ],
  });
  console.info(`Created product ${slug}`);
  const optionGroups = new Map<string, string[]>();
  product.variants.forEach((variant) => {
    variant.options.forEach((option) => {
      const existingOptions = optionGroups.get(option.name) || [];
      existingOptions.push(option.value);
      optionGroups.set(option.name, existingOptions);
    });
  });
  // Create optionGroups
  const createdGroups: Translated<ProductOptionGroup>[] = [];
  // @ts-ignore
  for (const [optionName, optionValues] of optionGroups.entries()) {
    const createdGroup = await productOptionResolver.createProductOptionGroup(
      ctx,
      {
        input: {
          code: optionName,
          translations: [
            {
              languageCode: LanguageCode.en,
              name: optionName,
            },
          ],
          options: optionValues.map((value) => ({
            code: value,
            translations: [
              {
                languageCode: LanguageCode.en,
                name: value,
              },
            ],
          })),
        },
      }
    );
    createdGroups.push(createdGroup);
    await productService.addOptionGroupToProduct(
      ctx,
      productId,
      createdGroup.id
    );
    console.info(
      `Created optionGroup ${optionName} with options ${optionValues.join(',')}`
    );
  }
  // Find optionIds for variant
  const createdOptions = createdGroups.map((group) => group.options).flat();
  const input: CreateProductVariantInput[] = product.variants.map((variant) => {
    const optionIds = new Set<string | number>();
    variant.options.forEach((variantOption) => {
      const createdOption = createdOptions.find(
        (option) => option.code === variantOption.value
      );
      if (!createdOption) {
        throw Error(
          `Could not find created option for ${variant.sku} - ${variantOption.value}`
        );
      }
      optionIds.add(createdOption.id);
    });
    console.log(`Creating variant ${variant.sku} with options ${optionIds}`);
    return {
      productId,
      sku: variant.sku,
      price: variant.price,
      stockOnHand: variant.stock,
      optionIds: Array.from(optionIds),
      taxCategoryId: defaultTaxCategoryId,
      translations: [
        {
          languageCode: LanguageCode.en,
          name: variant.name,
        },
      ],
    };
  });
  await variantService.create(ctx, input);
}

async function logAndExit(message: string) {
  console.error(message);
  await app?.close();
  process.exit(1);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}
