import {Body, Controller, Req, Post, Headers} from '@nestjs/common';
import {Request} from 'express';
import {ChannelService, OrderService} from '@vendure/core';
import {Connection} from 'typeorm';
import {PaymentStateMachine} from '@vendure/core/dist/service/helpers/payment-state-machine/payment-state-machine';
import {SendcloudService} from './sendcloud.service';
import {SendcloudClient} from './sendcloud.client';

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
    async webhook(@Req() req: Request, @Body() body: any, @Headers(SendcloudClient.signatureHeader) signature: string): Promise<void> {
        if(!this.sendcloudService.client.isValidWebhook((req as any).rawBody, signature)) {
            console.error(`Invalid signature in incoming Sendcloud webhook`, body);
        }
        // TODO
    }
}