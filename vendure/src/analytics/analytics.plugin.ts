import {PluginCommonModule, RuntimeVendureConfig, VendurePlugin} from '@vendure/core';
import {AnalyticsController} from './analytics.controller';
import {ChannelConfigPlugin} from '../channel-config/channel-config.plugin';

/**
 * Basic analytics based on database orders.
 * Sends emails to channelAdministrators
 */
@VendurePlugin({
    imports: [PluginCommonModule, ChannelConfigPlugin],
    controllers: [AnalyticsController],
})
export class AnalyticsPlugin {
}
