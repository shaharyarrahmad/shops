import {
  bootstrap,
  ChannelService,
  ConfigService,
  ID,
  ListQueryBuilder,
  ProductPriceApplicator,
  ProductVariant,
  RequestContext,
  Translated,
  translateDeep,
} from '@vendure/core';
import { config } from '../src/vendure-config';

type VariantWithImage = {
  id: ID;
  sku: string;
  name: string;
  priceWithTax: number;
  absoluteImageUrl?: string;
};

(async () => {
  require('dotenv').config({ path: process.env.LOCAL_ENV });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);

  const listQueryBuilder = app.get(ListQueryBuilder);
  const productPriceApplicator = app.get(ProductPriceApplicator);
  const channelService = app.get(ChannelService);
  const configService = app.get(ConfigService);
  const channel = await channelService.getChannelFromToken('cantastic');
  const ctx = new RequestContext({
    channel,
    authorizedAsOwnerOnly: false,
    apiType: 'admin',
    isAuthorized: true,
    languageCode: channel.defaultLanguageCode,
  });
  const translatedVariants: VariantWithImage[] = [];
  const take = 100;
  let skip = 0;
  let hasMore = true;

  console.time('Get all variants');
  while (hasMore) {
    const variants = await listQueryBuilder
      .build(
        ProductVariant,
        {
          skip,
          take,
        },
        {
          relations: [
            'featuredAsset',
            'channels',
            'product',
            'product.featuredAsset',
            'taxCategory',
          ],
          channelId: ctx.channelId,
          where: { deletedAt: null },
          ctx,
        }
      )
      .getMany();
    hasMore = !!variants.length;
    skip += take;
    const variantsWithPrice = await Promise.all(
      variants.map((v) =>
        productPriceApplicator.applyChannelPriceAndTax(v, ctx)
      )
    );
    const mappedVariants = variantsWithPrice
      .map((v) => translateDeep(v, ctx.languageCode))
      .map((v) => setAbsoluteImage(ctx, v, configService));
    translatedVariants.push(...mappedVariants);
  }
  console.log(translatedVariants.length);
  console.timeEnd('Get all variants');

  process.exit(0);
})();

function setAbsoluteImage(
  ctx: RequestContext,
  variant: Translated<ProductVariant>,
  configService: ConfigService
): VariantWithImage {
  // Resolve images as if we are shop client
  const shopCtx = new RequestContext({
    apiType: 'shop',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel: ctx.channel,
  });
  let imageUrl =
    variant.featuredAsset?.preview || variant.product.featuredAsset?.preview;
  if (
    configService.assetOptions.assetStorageStrategy.toAbsoluteUrl &&
    imageUrl
  ) {
    imageUrl = configService.assetOptions.assetStorageStrategy.toAbsoluteUrl!(
      shopCtx.req as any,
      imageUrl
    );
  }
  return {
    id: variant.id,
    sku: variant.sku,
    name: variant.name,
    priceWithTax: variant.priceWithTax,
    absoluteImageUrl: imageUrl,
  };
}
