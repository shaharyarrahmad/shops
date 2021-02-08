import {PluginCommonModule, RuntimeVendureConfig, VendurePlugin} from '@vendure/core';

@VendurePlugin({
    imports: [PluginCommonModule],
    controllers: [],
    configuration: (config: RuntimeVendureConfig) => {
        return config;
    },
})
export class SendcloudPlugin {
    constructor() {
        console.log('GELUKT')
    }
}
