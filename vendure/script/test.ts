require('dotenv').config({ path: process.env.LOCAL_ENV });
import {
  Administrator,
  bootstrap,
  TransactionalConnection,
} from '@vendure/core';
import { config } from '../src/vendure-config';

(async () => {
  const app = await bootstrap(config);

  interface AdminWithChannel {
    admin_emailAddress: string;
    channel_code: string;
  }

  const channel = { id: 5 };

  let admins: AdminWithChannel[] = await app
    .get(TransactionalConnection)
    .getRepository(Administrator)
    .createQueryBuilder('admin')
    .innerJoin('admin.user', 'user')
    .innerJoin('user.roles', 'role')
    .innerJoinAndSelect('role.channels', 'channel', 'channel.id = :channelId', {
      channelId: channel.id,
    })
    .execute();
  if (!admins?.[0]?.channel_code) {
    return console.error(`No channel found with id ${5}`);
  }
  const channelName = admins[0].channel_code;
  admins = admins.filter((admin) => admin.admin_emailAddress.includes('@'));
  if (!admins?.[0]?.admin_emailAddress) {
    console.error(
      `No admin found to send confirmation email for channel with id ${channel.id}`
    );
  }
  const adminRecipients = admins
    .map((admin) => admin.admin_emailAddress)
    .join(',');
  console.log(
    `Sending order confirmation email to ${adminRecipients} for channel ${channelName}`
  );

  process.exit(0);
})();
