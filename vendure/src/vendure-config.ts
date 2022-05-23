import {
  CollectionEvent,
  CollectionModificationEvent,
  DefaultLogger,
  DefaultSearchPlugin,
  defaultShippingEligibilityChecker,
  LanguageCode,
  LogLevel,
  ProductEvent,
  ProductVariantChannelEvent,
  ProductVariantEvent,
  VendureConfig,
  VendureLogger,
} from '@vendure/core';
import { EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import path from 'path';
import {
  GoogleStoragePlugin,
  GoogleStorageStrategy,
} from 'vendure-plugin-google-storage-assets';
import { AllocateStockOnSettlementStrategy } from './stock-allocation/allocate-stock-on-settlement.strategy';
import { WebhookPlugin } from 'vendure-plugin-webhook';
import { DutchPostalCodePlugin } from 'vendure-plugin-dutch-postalcode';
import { CloudTasksPlugin } from 'vendure-plugin-google-cloud-tasks';
import { cloudLogger } from './logger';
import { MyparcelPlugin } from 'vendure-plugin-myparcel/dist/myparcel.plugin';
import { ShippingBasedTaxZoneStrategy } from './tax/shipping-based-tax-zone.strategy';
import { cartTaxShippingCalculator } from './tax/shipping-tax-calculator';
import { eligibleByZoneChecker } from './shipping/shipping-by-zone-checker';
import { MolliePlugin } from '@vendure/payments-plugin/package/mollie';
import { orderConfirmationHandler } from './order/order-confirmation.handlers';
import { PlaceOrderOnSettlementStrategy } from './order/place-order-on-settlement.strategy';
import { GoedgepicktPlugin } from 'vendure-plugin-goedgepickt';
import {
  GoogleStorageInvoiceStrategy,
  InvoicePlugin,
} from 'vendure-plugin-invoices';
import { TaxInvoiceStrategy } from './invoice/tax-invoice-strategy';
import { CoinbasePlugin } from 'vendure-plugin-coinbase';
import { EBoekhoudenPlugin } from 'vendure-plugin-e-boekhouden';
import { EBookPlugin } from './e-book/e-book.plugin';

let logger: VendureLogger;
export let runningLocal = false;
export let runningInWorker = false;
if (process.env.K_SERVICE) {
  // This means we are in CloudRun
  logger = cloudLogger;
  runningInWorker = process.env.K_SERVICE.indexOf('worker') > -1; // Name of worker is worker or worker-test
} else {
  logger = new DefaultLogger({ level: LogLevel.Debug });
  runningLocal = true;
}

export const config: VendureConfig = {
  logger,
  orderOptions: {
    stockAllocationStrategy: new AllocateStockOnSettlementStrategy(),
    orderPlacedStrategy: new PlaceOrderOnSettlementStrategy(),
  },
  apiOptions: {
    port: (process.env.PORT! as unknown as number) || 3000,
    adminApiPath: 'admin-api',
    adminApiPlayground: runningLocal ? {} : false,
    adminApiDebug: false, // turn this off for production
    shopApiPath: 'shop-api',
    shopApiPlayground: {}, // turn this off for production
    shopApiDebug: false, // turn this off for production
    shopListQueryLimit: 500,
  },
  authOptions: {
    superadminCredentials: {
      identifier: 'admin',
      password: process.env.SUPERADMIN_PASS!,
    },
    tokenMethod: 'bearer',
  },
  assetOptions: {
    permittedFileTypes: ['image/*', 'video/*', 'audio/*', '.pdf', '.epub'],
    uploadMaxFileSize: 31457280,
  },
  dbConnectionOptions: {
    type: 'mysql',
    synchronize: false,
    logging: false,
    username: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    host: process.env.DATABASE_HOST!,
    database: process.env.DATABASE_NAME!,
    migrations: [path.join(__dirname, '../migrations/*.ts')],
    socketPath: runningLocal
      ? undefined
      : `/cloudsql/${process.env.SOCKET_CONNECTION_NAME}`,
  },
  taxOptions: {
    taxZoneStrategy: new ShippingBasedTaxZoneStrategy(),
  },
  shippingOptions: {
    shippingCalculators: [cartTaxShippingCalculator],
    shippingEligibilityCheckers: [
      defaultShippingEligibilityChecker,
      eligibleByZoneChecker,
    ],
  },
  paymentOptions: {
    paymentMethodHandlers: [],
  },
  customFields: {
    Product: [
      {
        name: 'metaTitle',
        label: [{ value: 'Meta title', languageCode: LanguageCode.en }],
        type: 'localeString',
        ui: { component: 'text-form-input', tab: 'SEO' },
      },
      {
        name: 'metaDescription',
        label: [{ value: 'Meta description', languageCode: LanguageCode.en }],
        type: 'localeString',
        ui: { component: 'textarea-form-input', tab: 'SEO' },
        validate: (value: string) => {
          if (value?.length > 255) {
            return [
              {
                value: 'Meta description can be max 255 characters',
                languageCode: LanguageCode.en,
              },
            ];
          }
        },
      },
      {
        name: 'keywords',
        label: [{ value: 'Keywords', languageCode: LanguageCode.en }],
        description: [
          {
            languageCode: LanguageCode.en,
            value: 'Comma seperated list of keywords',
          },
        ],
        type: 'localeString',
        ui: { component: 'textarea-form-input', tab: 'Search' },
        validate: (value: string) => {
          if (value?.length > 255) {
            return [
              {
                value: 'Keywords can be max 255 characters',
                languageCode: LanguageCode.en,
              },
            ];
          }
        },
      },
    ],
  },
  plugins: [
    EBoekhoudenPlugin,
    EBookPlugin.init(process.env.VENDURE_HOST!),
    InvoicePlugin.init({
      vendureHost: process.env.VENDURE_HOST!,
      storageStrategy: new GoogleStorageInvoiceStrategy({
        bucketName: 'pinelab-invoices',
        storageOptions: runningLocal ? { keyFilename: 'key.json' } : undefined,
      }),
      dataStrategy: new TaxInvoiceStrategy(),
    }),
    CloudTasksPlugin.init({
      taskHandlerHost: process.env.WORKER_HOST!,
      projectId: process.env.GOOGLE_PROJECT_ID!,
      location: 'europe-west1',
      authSecret: process.env.CLOUD_TASKS_SECRET!,
      queueSuffix: process.env.SHOP_ENV!,
    }),
    DutchPostalCodePlugin.init(process.env.POSTCODE_APIKEY!),
    WebhookPlugin.init({
      httpMethod: 'POST',
      delay: 3000,
      disabled: runningInWorker || runningLocal, // disable for 'worker' and locally
      events: [
        ProductEvent,
        ProductVariantChannelEvent,
        ProductVariantEvent,
        CollectionModificationEvent,
        CollectionEvent,
      ],
    }),
    MolliePlugin.init({ vendureHost: process.env.VENDURE_HOST! }),
    GoogleStoragePlugin,
    CoinbasePlugin,
    MyparcelPlugin.init({
      vendureHost: process.env.VENDURE_HOST!,
      syncWebhookOnStartup: process.env.SHOP_ENV === 'prod', // Don't sync for envs except prod
    }),
    GoedgepicktPlugin.init({
      vendureHost: process.env.VENDURE_HOST!,
      endpointSecret: process.env.WEBHOOK_TOKEN!,
      setWebhook: process.env.SHOP_ENV === 'prod', // Only set webhook for prod
    }),
    AssetServerPlugin.init({
      storageStrategyFactory: () =>
        new GoogleStorageStrategy({
          bucketName: process.env.BUCKET!,
          thumbnails: {
            height: 500,
            width: 500,
          },
        }),
      route: 'assets',
      assetUploadDir: '/tmp/vendure/assets',
    }),
    DefaultSearchPlugin,
    EmailPlugin.init({
      transport: {
        type: 'smtp',
        host: 'smtp.zoho.eu',
        port: 587,
        secure: false,
        logging: false,
        debug: false,
        auth: {
          user: 'noreply@pinelab.studio',
          pass: process.env.ZOHO_PASS!,
        },
      },
      handlers: [orderConfirmationHandler],
      templatePath: path.join(__dirname, '../static/email/templates'),
      globalTemplateVars: {
        fromAddress: '"Webshop" <noreply@pinelab.studio>',
      },
    }),
    // Production ready, precompiled admin UI
    AdminUiPlugin.init({
      route: 'admin',
      port: 3002,
      adminUiConfig: {
        brand: 'Pinelab shops',
        hideVendureBranding: false,
        hideVersion: false,
      },
      app: {
        path: path.join(__dirname, '__admin-ui/dist'),
      },
    }),
  ],
};
