import {PluginCommonModule, RuntimeVendureConfig, VendurePlugin} from '@vendure/core';

@VendurePlugin({
    imports: [PluginCommonModule],
    controllers: [],
    configuration: (config: RuntimeVendureConfig) => {
        config.assetOptions.
        return config;
    },
})
export class GoogleStorageAssetsPlugin {
}
