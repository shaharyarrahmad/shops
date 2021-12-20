import {
  CollectionModificationEvent,
  DefaultLogger,
  DefaultSearchPlugin,
  defaultShippingEligibilityChecker,
  LogLevel,
  ProductEvent,
  ProductVariantChannelEvent,
  ProductVariantEvent,
  VendureConfig,
  VendureLogger
} from '@vendure/core';
import { EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import path from 'path';
import { GoogleStoragePlugin, GoogleStorageStrategy } from 'vendure-plugin-google-storage-assets';
import { CustomStockAllocationStrategy } from './stock-allocation/custom-stock-allocation.strategy';
import { ChannelConfigPlugin } from './channel-config/channel-config.plugin';
import { WebhookPlugin } from 'vendure-plugin-webhook';
import { channelAwareEmailHandlers } from './channel-config/channel-aware-email.handlers';
import { DutchPostalCodePlugin } from 'vendure-plugin-dutch-postalcode';
import { CloudTasksPlugin } from 'vendure-plugin-google-cloud-tasks';
import { cloudLogger } from './logger';
import { MyparcelPlugin } from 'vendure-plugin-myparcel/dist/myparcel.plugin';
import { ShippingBasedTaxZoneStrategy } from './tax/shipping-based-tax-zone.strategy';
import { cartTaxShippingCalculator } from './tax/shipping-tax-calculator';
import { eligibleByZoneChecker } from './shipping/shipping-by-zone-checker';
import { MolliePlugin } from '../../../vendure/packages/payment-plugin/package/mollie';

let logger: VendureLogger;
if (process.env.K_SERVICE) {
  // This means we are in CloudRun
  logger = cloudLogger;
} else {
  logger = new DefaultLogger({ level: LogLevel.Debug });
}

export const config: VendureConfig = {
  logger,
  orderOptions: {
    stockAllocationStrategy: new CustomStockAllocationStrategy()
  },
  apiOptions: {
    port: (process.env.PORT! as unknown as number) || 3000,
    adminApiPath: 'admin-api',
    adminApiPlayground: {}, // turn this off for production
    adminApiDebug: false, // turn this off for production
    shopApiPath: 'shop-api',
    shopApiPlayground: {}, // turn this off for production
    shopApiDebug: false // turn this off for production
  },
  authOptions: {
    superadminCredentials: {
      identifier: 'admin',
      password: process.env.SUPERADMIN_PASS!
    },
    tokenMethod: 'bearer'
  },
  dbConnectionOptions: {
    type: 'mysql',
    synchronize: false,
    logging: false,
    username: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    host: process.env.DATABASE_HOST!,
    database: process.env.DATABASE_NAME!,
    migrations: [path.join(__dirname, '../migrations/*.ts')]
  },
  taxOptions: {
    taxZoneStrategy: new ShippingBasedTaxZoneStrategy()
  },
  shippingOptions: {
    shippingCalculators: [cartTaxShippingCalculator],
    shippingEligibilityCheckers: [
      defaultShippingEligibilityChecker,
      eligibleByZoneChecker
    ]
  },
  paymentOptions: {
    paymentMethodHandlers: []
  },
  customFields: {},
  plugins: [
/*    CloudTasksPlugin.init({
      taskHandlerHost: process.env.WORKER_HOST!,
      projectId: process.env.GOOGLE_PROJECT_ID!,
      location: 'europe-west1',
      authSecret: process.env.CLOUD_TASKS_SECRET!,
      queueSuffix: process.env.SHOP_ENV!
    }),*/
    DutchPostalCodePlugin.init(process.env.POSTCODE_APIKEY!),
    WebhookPlugin.init({
      httpMethod: 'POST',
      delay: 3000,
      events: [
        ProductEvent,
        ProductVariantChannelEvent,
        ProductVariantEvent,
        CollectionModificationEvent
      ]
    }),
    MolliePlugin.init({ vendureHost: process.env.VENDURE_HOST! }),
    ChannelConfigPlugin,
    GoogleStoragePlugin,
    MyparcelPlugin.init(
      {
        demo: process.env.MYPARCEL_DEMO!,
        'super-a': process.env.MYPARCEL_SUPERA!,
        bendeboef: process.env.MYPARCEL_BENDEBOEF!
      },
      process.env.VENDURE_HOST!
    ),
    AssetServerPlugin.init({
      storageStrategyFactory: () =>
        new GoogleStorageStrategy({
          bucketName: process.env.BUCKET!
        }),
      route: 'assets',
      assetUploadDir: '/tmp/vendure/assets'
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
          pass: process.env.ZOHO_PASS!
        }
      },
      handlers: channelAwareEmailHandlers,
      templatePath: path.join(__dirname, '../static/email/templates'),
      globalTemplateVars: {
        fromAddress: '"Webshop" <noreply@pinelab.studio>'
      }
    }),
    // Production ready, precompiled admin UI
    AdminUiPlugin.init({
      route: 'admin',
      port: 3002,
      app: {
        path: path.join(__dirname, '__admin-ui/dist')
      }
    })
  ]
};
