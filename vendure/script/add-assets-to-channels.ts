require('dotenv').config({ path: process.env.LOCAL_ENV });
import { bootstrap, ChannelService, RequestContext } from '@vendure/core';
import { config } from '../src/vendure-config';
import { QueryRunner, getConnection } from 'typeorm';

(async () => {
  console.log(`\x1b[46mUsing database ${process.env.DATABASE_NAME} \x1b[0m`);
  const app = await bootstrap(config);
  const channelService = app.get(ChannelService);
  const channels = await channelService.findAll(RequestContext.empty());
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();
  for (let c of channels.filter((c) => c.code !== '__default_channel__')) {
    await addToDefaultChannel(queryRunner, 'asset', 'assetId', c.code);
    console.log(`Added assets to channel ${c.code}`);
  }
  process.exit(0);
})();

export async function addToDefaultChannel(
  queryRunner: QueryRunner,
  tableName: string,
  idName: string,
  channelCode: string
) {
  const channelTableName = `${tableName}_channels_channel`;
  const result = await queryRunner.query(
    'INSERT INTO `' +
      channelTableName +
      '` (' +
      idName +
      ", channelId) SELECT id, (SELECT id from `channel` WHERE `code` = '" +
      channelCode +
      "') FROM `" +
      tableName +
      '`',
    []
  );
}
