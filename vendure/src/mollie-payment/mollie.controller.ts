import {Body, Controller, Param, Post} from '@nestjs/common';
import {ChannelService, LanguageCode, OrderService, Payment, RequestContext} from '@vendure/core';
import {MollieChannel} from './mollie-channel';
import {Connection} from 'typeorm';
import {PaymentStatus} from '@mollie/api-client';
import {PaymentStateMachine} from '@vendure/core/dist/service/helpers/payment-state-machine/payment-state-machine';

@Controller('payments')
export class MollieController {
    constructor(private orderService: OrderService, private connection: Connection, private channelService: ChannelService, private paymentStateMachine: PaymentStateMachine) {
    }

    @Post('mollie/:channelToken')
    async webhook(@Param('channelToken') channelToken: string, @Body() body: any): Promise<void> {
        const ctx = await this.createContext(channelToken)
        console.log(`Received payment for ${channelToken}`);
        const client = await MollieChannel.getClientAsync(channelToken, this.connection);
        const molliePayment = await client.payments.get(body.id);
        console.log(`Payment for channel ${channelToken}, orderCode ${molliePayment.metadata.orderCode} has status ${molliePayment.status}`);
        // find payment in DB by id
        const dbPayment = await this.connection.getRepository(Payment).findOneOrFail({where: {transactionId: molliePayment.id}});
        if (molliePayment.status === PaymentStatus.paid) {
            await this.orderService.settlePayment(ctx, dbPayment.id);
        } else {
            const order = await this.orderService.findOneByCode(ctx, molliePayment.metadata.orderCode);
            await this.paymentStateMachine.transition(ctx, order!, dbPayment, 'Declined');
        }
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
