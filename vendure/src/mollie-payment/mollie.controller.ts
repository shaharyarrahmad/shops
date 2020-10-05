import {Body, Controller, Param, Post} from '@nestjs/common';
import {ChannelService, Ctx, OrderService, RequestContext, LanguageCode} from '@vendure/core';
import {MollieChannel} from './mollie-channel';
import {Connection} from 'typeorm';
import {PaymentStatus} from '@mollie/api-client';

@Controller('payments')
export class MollieController {
    constructor(private orderService: OrderService, private connection: Connection, private channelService: ChannelService) {
    }

    @Post('mollie/:channelToken')
    async webhook(@Param('channelToken') channelToken: string, @Body() body: any): Promise<void> {
        const ctx = await this.createContext(channelToken)
        console.log(`Received payment for ${channelToken}`);
        const client = await MollieChannel.getClientAsync(channelToken, this.connection);
        const payment = await client.payments.get(body.id);
        console.log(`Payment for channel ${channelToken}, orderCode ${payment.metadata.orderCode} has status ${payment.status}`);
        const order = await this.orderService.findOneByCode(ctx, payment.metadata.orderCode);
        if (payment.status === PaymentStatus.paid) {
            // await this.orderService.settlePayment(ctx)
        }
        console.log(order);
    }

    private async createContext(channelToken: string): Promise<RequestContext> {
        const channel = await this.channelService.getChannelFromToken(channelToken);
        return new RequestContext({
            apiType: 'admin',
            isAuthorized: true,
            authorizedAsOwnerOnly: false,
            channel,
            languageCode: LanguageCode.en,
        });
    }
}
