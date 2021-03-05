import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { ChannelConfigService } from './channel-config.service';
import { ChannelConfigEntity } from './channel-config.entity';

/**
 * Information about a specific channel like supportEmail,
 * and logo's used in email templates
 */
@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [ChannelConfigService],
  exports: [ChannelConfigService],
  entities: [ChannelConfigEntity],
})
export class ChannelConfigPlugin {}
