import {Body, Controller, Post} from '@nestjs/common';
import {Channel, LanguageCode, Order} from '@vendure/core';
import {Connection} from 'typeorm';
import {ChannelConfigService} from '../channel-config/channel-config.service';
import {ChannelConfig} from '../channel-config/channel-config';

@Controller('analytics')
export class AnalyticsController {
    constructor(private connection: Connection, private channelService: ChannelConfigService) {
    }

    /**
     * Most sold products (1, 2 and 3), Average order value, Shopping cart abandonment rate, Recurring customers
     */
    @Post('email')
    async sendEmail(@Body() body: any): Promise<void> {
        if (!body.token || body.token !== process.env.WEBHOOK_TOKEN) {
            throw Error(`You are not authorized to make this call`);
        }
        const startOfLastMonth = new Date();
        startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
        startOfLastMonth.setDate(1);
        startOfLastMonth.setHours(0);
        startOfLastMonth.setMinutes(0);
        startOfLastMonth.setSeconds(0);
        const endOfLastMonth = new Date(startOfLastMonth.getTime());
        endOfLastMonth.setMonth(endOfLastMonth.getMonth() + 1);
        const monthName = startOfLastMonth.toLocaleString('nl-NL', { month: "long" });
        console.log(`Sending analytics email to all channel owners. Getting metrics for ${monthName}`);
        const channels = await this.connection
            .getRepository(Channel)
            .createQueryBuilder('channel')
            .getMany();
        for (const channel of channels) {
            const config = await this.channelService.getConfig(channel.token).catch(e => console.error(e)) as ChannelConfig;
            if (!config?.supportEmail) {
                console.error(`Not sending analytics email for channel ${channel.token} because no support email was found`);
                continue;
            }

            const orders = await this.connection
                .getRepository(Order)
                .createQueryBuilder('order')
                .leftJoin('order.channels', 'channel')
                .leftJoinAndSelect('order.customer', 'customer')
                .leftJoinAndSelect('customer.user', 'user') // Used in de 'Order' query, guess this didn't work before?
                .leftJoinAndSelect('order.lines', 'lines')
                .leftJoinAndSelect('lines.productVariant', 'productVariant')
                .leftJoinAndSelect('productVariant.taxCategory', 'prodVariantTaxCategory')
                .leftJoinAndSelect('productVariant.productVariantPrices', 'prices')
                .leftJoinAndSelect('productVariant.translations', 'translations')
                .leftJoinAndSelect('lines.featuredAsset', 'featuredAsset')
                .leftJoinAndSelect('lines.items', 'items')
                .leftJoinAndSelect('items.fulfillment', 'fulfillment')
                .leftJoinAndSelect('lines.taxCategory', 'lineTaxCategory')
                .where('channel.id = :channelId', {channelId: channel.id})
                .andWhere('order.createdAt > :startOfLastMonth', {startOfLastMonth})
                .andWhere('order.createdAt < :endOfLastMonth', {endOfLastMonth})
                .getMany();

            console.log(orders.map(o => o.createdAt));

        }
    }
}
