export interface ChannelConfig {
    channelToken: string;
    channelName: string;
    supportEmail: string;
    logoUrl: string;

}

export const channelConfig: ChannelConfig[] = [
    {
        channelName: 'de Pinelab Demo Shop',
        channelToken: 'demo',
        logoUrl: 'https://shop.marcdefotograaf.nl/marcdefotograaf.png',
        supportEmail: 'martijn@pinelab.studio'
    },{
        channelName: 'Marc de Fotograaf',
        channelToken: 'marcdefotograaf9283',
        logoUrl: 'https://shop.marcdefotograaf.nl/marcdefotograaf.png',
        supportEmail: 'info@marcdefotograaf.nl'
    }
]