import {Body, Controller, Headers, Post, Req} from '@nestjs/common';
import {Request} from 'express';
import {SendcloudService} from './sendcloud.service';
import {SendcloudClient} from './sendcloud.client';

@Controller('sendcloud')
export class SendcloudController {
    constructor(private sendcloudService: SendcloudService) {
    }

    @Post('webhook')
    async webhook(@Req() req: Request, @Body() body: any, @Headers(SendcloudClient.signatureHeader) signature: string): Promise<void> {
        if (!this.sendcloudService.client.isValidWebhook((req as any).rawBody, signature)) {
            console.error(`Invalid signature in incoming Sendcloud webhook`, body);
        }
        // TODO
    }
}