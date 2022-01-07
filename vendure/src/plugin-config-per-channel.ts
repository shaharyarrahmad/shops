// TODO this data should be moved to DB

interface Config {
  channelToken: string;
  myParcelApiKey?: string;
  goedgepicktApiKey?: string;
  goedgepicktWebshopUuid?: string;
}

export const pluginConfigPerChannel: Config[] = [
  {
    channelToken: 'demo',
    goedgepicktApiKey: process.env.GOEDGEPICKT_API!,
    goedgepicktWebshopUuid: '83f338e2-2a3f-492f-ac85-edbe2caa339f',
    myParcelApiKey: process.env.MYPARCEL_DEMO!,
  },
  {
    channelToken: 'super-a',
    myParcelApiKey: process.env.MYPARCEL_SUPERA!,
  },
  {
    channelToken: 'bendeboef',
    myParcelApiKey: process.env.MYPARCEL_BENDEBOEF!,
  },
];
