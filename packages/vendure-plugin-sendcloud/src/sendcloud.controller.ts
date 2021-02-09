import {Body, Controller, Req, Post, Headers} from '@nestjs/common';
import {Request} from 'express';
import {ChannelService, OrderService} from '@vendure/core';
import {Connection} from 'typeorm';
import {PaymentStateMachine} from '@vendure/core/dist/service/helpers/payment-state-machine/payment-state-machine';
import {SendcloudService} from './sendcloud.service';

@Controller('sendcloud')
export class SendcloudController {
    constructor(private orderService: OrderService,
                private connection: Connection,
                private channelService: ChannelService,
                private paymentStateMachine: PaymentStateMachine,
                private sendcloudService: SendcloudService
    ) {
    }

    @Post('webhook')
    async webhook(@Req() req: Request, @Body() body: any, @Headers('Sendcloud-Signature') signature: string): Promise<void> {
        console.log('TDODOO webhook', this.sendcloudService.client.isValidWebhook(JSON.stringify(body), signature));
    }
}