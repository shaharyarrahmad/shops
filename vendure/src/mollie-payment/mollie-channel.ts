import createMollieClient, {MollieClient} from '@mollie/api-client';
import {molliePaymentHandler} from './mollie-handler';
import {PaymentMethod} from '@vendure/core';
import { Connection } from 'typeorm';

export class MollieChannel {

    /**
     * Get client based on given channel and paymentmethod args
     * ChannelKeys are formatted like this: 'channelToken=key_29h271jl839202'
     */
    static getClient(channelKeys: string[], channel: string): MollieClient {
        if (!channelKeys || channelKeys.length === 0) {
            throw Error(`No channelKeys configured!`);
        }
        let apiKey;
        channelKeys.find(channelKey => {
            const [ch, key] = channelKey.split('=');
            if (channel === ch) {
                apiKey = key;
                return true;
            }
        })
        if (!apiKey) {
            throw Error(`No Mollie api Key defined for ${channel}`);
        }
        return createMollieClient({apiKey});
    }

    /**
     * Queries the database to get PaymentMethod args
     */
    static async getClientAsync(channel: string, connection: Connection): Promise<MollieClient> {
        const method = await connection.getRepository<PaymentMethod>(PaymentMethod).findOne({
            where: {
                code: molliePaymentHandler.code,
            },
        });
        const args = method?.configArgs?.find(arg => arg.name === 'channelKeys');
        const channelKeys = args?.value ? JSON.parse(args?.value) : [];
        return this.getClient(channelKeys, channel);
    }
}
