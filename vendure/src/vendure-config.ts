import {
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    ProductEvent,
    ProductVariantChannelEvent,
    ProductVariantEvent,
    VendureConfig,
} from '@vendure/core';
import {EmailPlugin} from '@vendure/email-plugin';
import {AssetServerPlugin} from '@vendure/asset-server-plugin';
import {AdminUiPlugin} from '@vendure/admin-ui-plugin';
import path from 'path';
import {MolliePlugin} from './mollie-payment/mollie.plugin';
import {GoogleStorageStrategy} from './google-storage-assets/google-storage-strategy';
import {shopsMailHandlers} from "./email/email.handlers";
import {PublicStockPlugin} from './public-stock/public-stock.plugin';
import {CustomStockAllocationStrategy} from './stock-allocation/custom-stock-allocation.strategy';
import {ChannelConfigPlugin} from './channel-config/channel-config.plugin';
import {AnalyticsPlugin} from './analytics/analytics.plugin';
import {WebhookPlugin} from './webhook/webhook.plugin';

export const config: VendureConfig = {
    orderOptions: {
        stockAllocationStrategy: new CustomStockAllocationStrategy()
    },
    workerOptions: {
        runInMainProcess: true,
    },
    apiOptions: {
        port: process.env.PORT as unknown as number || 3000,
        adminApiPath: 'admin-api',
        adminApiPlayground: {},// turn this off for production
        adminApiDebug: false, // turn this off for production
        shopApiPath: 'shop-api',
        shopApiPlayground: {},// turn this off for production
        shopApiDebug: false,// turn this off for production
    },
    authOptions: {
        superadminCredentials: {
            identifier: 'admin',
            password: process.env.SUPERADMIN_PASS as string
        },
        tokenMethod: 'bearer',
    },
    dbConnectionOptions: {
        type: 'mysql',
        synchronize: false,
        logging: false,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        migrations: [path.join(__dirname, '../migrations/*.ts')],
    },
    paymentOptions: {
        paymentMethodHandlers: [],
    },
    customFields: {},
    plugins: [
        WebhookPlugin.init({
            httpMethod: 'POST',
            events: [ProductEvent, ProductVariantChannelEvent, ProductVariantEvent]
        }),
        PublicStockPlugin,
        MolliePlugin,
        ChannelConfigPlugin,
        AnalyticsPlugin,
        AssetServerPlugin.init({
            storageStrategyFactory: () => new GoogleStorageStrategy('pinelab-shops-assets'),
            route: 'assets',
            assetUploadDir: '/tmp/vendure/assets',
            port: 3001,
        }),
        DefaultJobQueuePlugin,
        DefaultSearchPlugin,
        EmailPlugin.init({
            transport: {
                type: 'smtp',
                host: 'smtp.zoho.eu',
                port: 587,
                secure: false,
                logging: true,
                debug: true,
                auth: {
                    user: 'noreply@pinelab.studio',
                    pass: process.env.ZOHO_PASS as string,
                }
            },
            handlers: shopsMailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                fromAddress: '"Webshop" <noreply@pinelab.studio>',
            },
        }),
        /*      // Uncomment this if need to recompile Admin UI
                AdminUiPlugin.init({
                    port: 3002,
                    app: compileUiExtensions({
                        devMode: true,
                        outputPath: path.join(__dirname, '__admin-ui'),
                        extensions: [WebhookPlugin.ui]
                    }),
                }),*/
        // Production ready, precompiled admin UI
        AdminUiPlugin.init({
            port: 3002,
            app: {
                path: path.join(__dirname, '__admin-ui/dist')
            },
        }),
    ],
};
