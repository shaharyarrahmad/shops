import {
  PluginCommonModule,
  RuntimeVendureConfig,
  VendurePlugin,
} from '@vendure/core';
import path from "path";
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';

@VendurePlugin({
  imports: [PluginCommonModule],
  controllers: [],
  configuration: (config: RuntimeVendureConfig) => {
    // config.paymentOptions.paymentMethodHandlers.push();
    return config;
  },
})
export class AdminUiLinksPlugin {

  static ui: AdminUiExtension = {
    // extensionPath: path.join(__dirname, 'ui'),
    extensionPath: __dirname,
    ngModules: [
      {
        type: 'shared',
        ngModuleFileName: 'admin-ui-nav.module.ts',
        ngModuleName: 'AdminUiNavModule',
      },
    ],
  };
}
