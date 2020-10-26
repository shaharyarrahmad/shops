require('dotenv').config();
import {bootstrap} from '@vendure/core';
import {config} from './vendure-config';
import localtunnel from 'localtunnel';

/**
 * Dev env settings
 */
process.env.STOREFRONT_HOST = 'http://localhost:4200';
(async () => {
    const tunnel = await localtunnel({port: 3000});
    // the assigned public url for your tunnel
    process.env.VENDURE_HOST = tunnel.url;
    console.log('Localtunnel set up', tunnel.url);
    tunnel.on('close', () => {
        console.error('tunnel closed');
    });
})();

bootstrap(config).catch(err => {
    // tslint:disable-next-line:no-console
    console.log(err);
});

