import { GoedgepicktClient } from '../src/goedgepickt/goedgepickt.client';

require('dotenv').config({ path: process.env.LOCAL_ENV });
import fetch from 'node-fetch';

(async () => {
  // const app = await bootstrap(config);

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.GOEDGEPICKT_API}`,
  };

  /*
  const result = await fetch('https://account.goedgepickt.nl/api/v1/products', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: "Product test 1",
      sku: "1234skuutje",
      productId: "1234skuutje",
      stockManagement: true,
      webshopUuid: '83f338e2-2a3f-492f-ac85-edbe2caa339f'
    }),
    redirect: 'follow'
  });*/

  /*  const result = await fetch('https://account.goedgepickt.nl/api/v1/products', {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      'Authorization': `Bearer ${process.env.GOEDGEPICKT_API}`
    },
    redirect: 'follow'
  })*/

  const client = new GoedgepicktClient({
    webshopUuid: '83f338e2-2a3f-492f-ac85-edbe2caa339f',
    apiKey: process.env.GOEDGEPICKT_API!,
  });

  console.log(
    await client.createProduct({
      name: 'Product test 1',
      sku: '1234skuutje',
      productId: '1234skuutje',
      stockManagement: true,
    })
  );

  process.exit(0);
})();
