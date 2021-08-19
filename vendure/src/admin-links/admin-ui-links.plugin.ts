import {
  PluginCommonModule,
  RuntimeVendureConfig,
  VendurePlugin,
} from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';

@VendurePlugin({
  imports: [PluginCommonModule],
  controllers: [],
  configuration: (config: RuntimeVendureConfig) => {
    return config;
  },
})
export class AdminUiLinksPlugin {
  static ui: AdminUiExtension = {
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
