import { EmailEventHandler, EmailEventListener } from '@vendure/email-plugin';
import {
  Administrator,
  Logger,
  OrderStateTransitionEvent,
  TransactionalConnection,
} from '@vendure/core';
import { TaxHelper } from '../tax/tax.helper';

interface AdminWithChannel {
  admin_emailAddress: string;
  channel_code: string;
}

export const channelAwareOrderConfirmationHandler: EmailEventHandler<any, any> =
  new EmailEventListener('order-confirmation')
    .on(OrderStateTransitionEvent)
    .filter(
      (event) =>
        event.toState === 'PaymentSettled' &&
        event.fromState !== 'Modifying' &&
        !!event.order.customer
    )
    .loadData(async ({ event, injector }) => {
      const channel = event.ctx.channel;
      let admins: AdminWithChannel[] = await injector
        .get(TransactionalConnection)
        .getRepository(Administrator)
        .createQueryBuilder('admin')
        .innerJoin('admin.user', 'user')
        .innerJoin('user.roles', 'role')
        .innerJoinAndSelect(
          'role.channels',
          'channel',
          'channel.id = :channelId',
          { channelId: channel.id }
        )
        .execute();
      if (!admins?.[0]?.channel_code) {
        throw Error(`No channel found with id ${channel.id}`);
      }
      const channelName = admins[0].channel_code;
      admins = admins.filter((admin) => admin.admin_emailAddress.includes('@'));
      if (!admins?.[0]?.admin_emailAddress) {
        Logger.error(
          `No admin found to send confirmation email for channel with id ${channel.id}`
        );
      }
      const adminRecipients = admins.map((admin) => admin.admin_emailAddress);
      Logger.info(
        `Sending order confirmation email to ${adminRecipients} for channel ${channelName}`
      );
      return { channelName, adminRecipients };
    })
    .setRecipient(
      (event) =>
        `${
          event.order.customer!.emailAddress
        },${event.data.adminRecipients.join(',')}`
    )
    .setFrom(`{{ fromAddress }}`)
    .setSubject(
      `Bedankt voor je bestelling bij {{ channelName }} met nr. {{ order.code }}`
    )
    .setTemplateVars((event) => {
      return {
        order: event.order,
        summary: TaxHelper.getTaxSummary(event.order),
        ...event.data,
      };
    });
