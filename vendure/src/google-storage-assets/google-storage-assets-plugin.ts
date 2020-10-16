import {PluginCommonModule, RuntimeVendureConfig, VendurePlugin} from '@vendure/core';
import {GoogleStorageStrategy} from './google-storage-strategy';

@VendurePlugin({
    imports: [PluginCommonModule],
    controllers: [],
    configuration: (config: RuntimeVendureConfig) => {
        config.assetOptions.assetStorageStrategy = new GoogleStorageStrategy();
        return config;
    },
})
export class GoogleStorageAssetsPlugin {
}
