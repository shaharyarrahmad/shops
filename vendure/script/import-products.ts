import {
  bootstrap,
  ChannelService,
  LanguageCode,
  ProductOptionGroup,
  ProductService,
  ProductVariantService,
  RequestContext,
  Translated,
} from '@vendure/core';
import { CreateProductVariantInput } from '@vendure/common/lib/generated-types';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';
import { ProductOptionResolver } from '@vendure/core/dist/api/resolvers/admin/product-option.resolver';

// TODO: get inputs: filepath, use filename as channelToken and use channelToken as named strategy

// Use this importer like this:
// yarn script:test script/import-products data/cantastic.csv

export type ProductReader = (csvRow: any) => ImportableProduct;

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

const strategyName = '';

const fileName = process.argv[2];
const channelToken = 'cantastic';

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

(async () => {
  require('dotenv').config({ path: process.env.LOCAL_ENV });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);

  // TODO creating optionGroup with options doesnt work
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  const ctx = new RequestContext({
    channel,
    isAuthorized: true,
    apiType: 'admin',
    authorizedAsOwnerOnly: false,
  });

  await createProduct(app, channelToken, testProduct);

  /*

    const rows = await parse(fileName);
    console.log(rows);
  */
  process.exit(0);
})();

function parse(fileName: string): Promise<ParseResult<unknown>> {
  const file = fs.readFileSync(fileName);
  return new Promise((resolve) => {
    Papa.parse(file.toString(), {
      header: true,
      complete: function (results) {
        resolve(results);
      },
    });
  });
}

async function createProduct(
  app: INestApplication,
  channelToken: string,
  product: ImportableProduct
): Promise<void> {
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  const ctx = new RequestContext({
    channel,
    isAuthorized: true,
    apiType: 'admin',
    authorizedAsOwnerOnly: false,
  });
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
