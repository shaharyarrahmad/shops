import {DefaultJobQueuePlugin, DefaultSearchPlugin, VendureConfig,} from '@vendure/core';
import {defaultEmailHandlers, EmailPlugin} from '@vendure/email-plugin';
import {AssetServerPlugin} from '@vendure/asset-server-plugin';
import {AdminUiPlugin} from '@vendure/admin-ui-plugin';
import path from 'path';
import {MolliePlugin} from './mollie-payment/mollie-plugin';
import {GoogleStorageStrategy} from './google-storage-assets/google-storage-strategy';

export const config: VendureConfig = {
    workerOptions: {
        runInMainProcess: true,
    },
    apiOptions: {
        port: process.env.PORT as unknown as number || 3000,
        adminApiPath: 'admin-api',
        adminApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        },// turn this off for production
        adminApiDebug: true, // turn this off for production
        shopApiPath: 'shop-api',
        shopApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        },// turn this off for production
        shopApiDebug: true,// turn this off for production
    },
    authOptions: {
        superadminCredentials: {
            identifier: 'admin',
            password: 'admin',
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
        MolliePlugin,
        AssetServerPlugin.init({
            storageStrategyFactory: () => new GoogleStorageStrategy('pinelab-shops-assets'),
            route: 'assets',
            assetUploadDir: '/tmp/vendure/assets',
            port: 3001,
        }),
        DefaultJobQueuePlugin,
        DefaultSearchPlugin,
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            mailboxPort: 3003,
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        AdminUiPlugin.init({port: 3002}),
    ],
};
