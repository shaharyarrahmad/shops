import {BeforeVendureBootstrap, PluginCommonModule, VendurePlugin} from '@vendure/core';
import {INestApplication} from '@nestjs/common';
import {SendcloudService} from './sendcloud.service';
import {SendcloudOptions} from './types/sendcloud-options';
import {SendcloudController} from './sendcloud.controller';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [SendcloudService],
    controllers: [SendcloudController],
})
export class SendcloudPlugin {

    static options: SendcloudOptions;

    static init(options: SendcloudOptions): typeof SendcloudPlugin {
        this.options = options;
        return SendcloudPlugin;
    }

    static beforeVendureBootstrap(app: INestApplication): void | Promise<void> {
        app.use()
        console.log('CALLED ----_-----')
    }

}
