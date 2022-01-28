import {
  bootstrap,
  Channel,
  ChannelService,
  CurrencyCode,
  LanguageCode,
  PaymentMethodService,
  Permission,
  RequestContext,
  RoleService,
  ZoneService,
} from '@vendure/core';
import prompt from 'prompt';

/**
 * Create a channel with default role
 */
const defaultPermissions: Permission[] = [];
defaultPermissions.push(
  Permission.CreateCatalog,
  Permission.ReadCatalog,
  Permission.UpdateCatalog,
  Permission.DeleteCatalog
);
defaultPermissions.push(
  Permission.CreateAsset,
  Permission.ReadAsset,
  Permission.UpdateAsset,
  Permission.DeleteAsset
);
defaultPermissions.push(
  Permission.CreateCollection,
  Permission.ReadCollection,
  Permission.UpdateCollection,
  Permission.DeleteCollection
);
defaultPermissions.push(Permission.ReadCountry);
defaultPermissions.push(
  Permission.CreateCustomer,
  Permission.ReadCustomer,
  Permission.UpdateCustomer,
  Permission.DeleteCustomer
);
defaultPermissions.push(
  Permission.CreateCustomerGroup,
  Permission.ReadCustomerGroup,
  Permission.UpdateCustomerGroup,
  Permission.DeleteCustomerGroup
);
defaultPermissions.push(
  Permission.CreateFacet,
  Permission.ReadFacet,
  Permission.UpdateFacet,
  Permission.DeleteFacet
);
defaultPermissions.push(
  Permission.CreateOrder,
  Permission.ReadOrder,
  Permission.UpdateOrder,
  Permission.DeleteOrder
);
defaultPermissions.push(
  Permission.CreatePaymentMethod,
  Permission.ReadPaymentMethod,
  Permission.UpdatePaymentMethod,
  Permission.DeletePaymentMethod
);
defaultPermissions.push(
  Permission.CreateProduct,
  Permission.ReadProduct,
  Permission.UpdateProduct,
  Permission.DeleteProduct
);
defaultPermissions.push(
  Permission.CreateShippingMethod,
  Permission.ReadShippingMethod,
  Permission.UpdateShippingMethod,
  Permission.DeleteShippingMethod
);
defaultPermissions.push(
  Permission.CreateTag,
  Permission.ReadTag,
  Permission.UpdateTag,
  Permission.DeleteTag
);
defaultPermissions.push(Permission.ReadTaxCategory);
defaultPermissions.push(Permission.ReadTaxRate);
defaultPermissions.push(Permission.ReadZone);

(async () => {
  require('dotenv').config({ path: process.env.LOCAL_ENV });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);
  // Prompt input
  const schema = {
    properties: {
      channelName: {
        pattern: /^[a-z0-9\-]+$/,
        message:
          'Name must be only lowercase letters,dashes or numbers. Name can be changed via UI later',
        required: true,
      },
    },
  };
  console.log(`Creating in ${process.env.DATABASE_NAME}`);
  prompt.start();
  const { channelName }: { channelName: string } = await prompt.get(schema);
  // Create channel
  const channelService = app.get(ChannelService);
  const zoneService = app.get(ZoneService);
  const roleService = app.get(RoleService);
  const paymentMethodService = app.get(PaymentMethodService);
  const defaultChannel = await channelService.getDefaultChannel();
  let ctx = new RequestContext({
    channel: defaultChannel,
    authorizedAsOwnerOnly: false,
    apiType: 'admin',
    isAuthorized: true,
  });
  const europe = (await zoneService.findAll(ctx)).find(
    (zone) => zone.name === 'Europe'
  );
  if (!europe) {
    throw Error(`Unable to find zone Europe. Cannot create channel`);
  }
  const channel = (await channelService.create(ctx, {
    code: channelName,
    token: channelName,
    currencyCode: CurrencyCode.EUR,
    defaultLanguageCode: LanguageCode.en,
    defaultShippingZoneId: europe.id,
    defaultTaxZoneId: europe.id,
    pricesIncludeTax: true,
  })) as Channel;
  if (!channel.code) {
    console.error(channel);
    throw Error(`Failed to create channel`);
  }
  console.log(`Created channel ${channel.code}`);
  // Create role
  const role = await (roleService as any).createRoleForChannels(
    ctx,
    {
      // Hack, because creating roles via code results in forbidden error
      code: `${channelName}-admin`,
      description: `${channelName} admin`,
      permissions: defaultPermissions,
      channelIds: [channel.id],
    },
    [channel]
  );
  console.log(`Created role ${role.description}`);
  // Create Mollie payment in created channel
  ctx = new RequestContext({
    channel,
    authorizedAsOwnerOnly: false,
    apiType: 'admin',
    isAuthorized: true,
  });
  const mollie = await paymentMethodService.create(ctx, {
    code: `mollie-payment-${channelName}`,
    name: `mollie-payment-${channelName}`,
    enabled: true,
    handler: {
      code: 'mollie-payment-handler',
      arguments: [
        {
          name: 'apiKey',
          value: 'Vul hier je apiKey in',
        },
        {
          name: 'redirectUrl',
          value: 'https://minishop.studio/order',
        },
      ],
    },
  });
  console.log(`Created Mollie paymentmethod: ${mollie.code}`);
  console.log(`All done. Don't forget to create a user via the Admin UI`);
  process.exit(0);
})();
