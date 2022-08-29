import {
  createTestEnvironment,
  registerInitializer,
  SqljsInitializer,
  testConfig,
} from '@vendure/testing';
import {
  ChannelService,
  CurrencyCode,
  DefaultLogger,
  DefaultSearchPlugin,
  defaultShippingCalculator,
  InitialData,
  LanguageCode,
  LogLevel,
  mergeConfig,
  PaymentMethodHandler,
  RequestContext,
} from '@vendure/core';
import { AllocateStockOnSettlementStrategy } from '../src/stock-allocation/allocate-stock-on-settlement.strategy';
import { PlaceOrderOnSettlementStrategy } from '../src/order/place-order-on-settlement.strategy';
import { InvoicePlugin, LocalFileStrategy } from 'vendure-plugin-invoices';
import { TaxInvoiceStrategy } from '../src/invoice/tax-invoice-strategy';
import { OrderExportPlugin } from 'vendure-plugin-order-export';
import { TaxExportStrategy } from '../src/tax/tax-export-strategy';
import { EmailPlugin } from '@vendure/email-plugin';
import { orderConfirmationHandler } from '../src/email/order-confirmation.handlers';
import path from 'path';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { ChannelResolver } from '@vendure/core/dist/api/resolvers/admin/channel.resolver';

const testPaymentMethod = new PaymentMethodHandler({
  code: 'test-payment-method',
  description: [
    { languageCode: LanguageCode.en, value: 'Test Payment Method' },
  ],
  args: {},
  createPayment: (ctx, order, amount, args, metadata) => {
    return {
      amount,
      state: 'Settled',
      transactionId: '12345',
      metadata: { public: metadata },
    };
  },
  settlePayment: () => ({
    success: true,
  }),
});

const initialData: InitialData = {
  defaultLanguage: LanguageCode.en,
  defaultZone: 'Europe',
  taxRates: [
    { name: 'Standard Tax', percentage: 21 },
    { name: 'Reduced Tax', percentage: 9 },
    { name: 'Zero Tax', percentage: 0 },
  ],
  shippingMethods: [
    { name: 'Standard Shipping', price: 500 },
    { name: 'Express Shipping', price: 1000 },
  ],
  paymentMethods: [
    {
      name: testPaymentMethod.code,
      handler: { code: testPaymentMethod.code, arguments: [] },
    },
  ],
  countries: [{ name: 'Nederland', code: 'NL', zone: 'Europe' }],
  collections: [
    {
      name: 'Electronics',
      filters: [
        {
          code: 'facet-value-filter',
          args: { facetValueNames: ['electronics'], containsAny: false },
        },
      ],
    },
  ],
};

export async function startDevServer() {
  registerInitializer(
    'sqljs',
    new SqljsInitializer(path.join(__dirname, '__data__'))
  );
  // Use live config as base, but override plugins for testing
  const liveConfig = require('../src/vendure-config').config;
  const config = mergeConfig(liveConfig, {
    logger: new DefaultLogger({ level: LogLevel.Debug }),
    orderOptions: {
      stockAllocationStrategy: new AllocateStockOnSettlementStrategy(),
      orderPlacedStrategy: new PlaceOrderOnSettlementStrategy(),
    },
    apiOptions: {
      port: 3000,
    },
    authOptions: testConfig.authOptions,
    dbConnectionOptions: {
      ...testConfig.dbConnectionOptions,
      synchronize: true,
    },
    paymentOptions: {
      paymentMethodHandlers: [testPaymentMethod],
    },
    shippingOptions: {
      ...liveConfig.shippingOptions,
      shippingCalculators: [
        ...liveConfig.shippingOptions.shippingCalculators,
        defaultShippingCalculator,
      ],
    },
    plugins: [
      InvoicePlugin.init({
        vendureHost: 'localhost:3000',
        storageStrategy: new LocalFileStrategy(),
        dataStrategy: new TaxInvoiceStrategy(),
      }),
      OrderExportPlugin.init({
        exportStrategies: [new TaxExportStrategy()],
      }),
      DefaultSearchPlugin,
      EmailPlugin.init({
        devMode: true,
        route: 'mailbox',
        handlers: [orderConfirmationHandler],
        templatePath: path.join(__dirname, '../static/email/templates'),
        outputPath: path.join(__dirname, 'test-emails'),
        globalTemplateVars: {
          fromAddress: 'martijn@pinelab.studio',
        },
      }),
      AdminUiPlugin.init({
        route: 'admin',
        port: 3002,
        adminUiConfig: {
          brand: 'Pinelab shops',
          hideVendureBranding: false,
          hideVersion: false,
        },
        app: {
          path: path.join(__dirname, '../src/__admin-ui/dist'),
        },
      }),
    ],
  });
  const { server, adminClient, shopClient } = createTestEnvironment(config);
  await server.init({
    initialData,
    productsCsvPath: path.join(__dirname, './products.csv'),
  });
  await adminClient.asSuperAdmin();
  const channelService = server.app.get(ChannelService);
  const defaultChannel = await channelService.getDefaultChannel();
  const ctx = new RequestContext({
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel: defaultChannel,
    apiType: 'admin',
  });
  await channelService.update(ctx, {
    id: defaultChannel.id,
    currencyCode: CurrencyCode.EUR,
  });
}
