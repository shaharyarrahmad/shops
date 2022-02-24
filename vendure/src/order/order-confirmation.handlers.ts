import { EmailEventHandler, EmailEventListener } from '@vendure/email-plugin';
import {
  Administrator,
  ID,
  Injector,
  Logger,
  OrderStateTransitionEvent,
  TransactionalConnection,
} from '@vendure/core';
import { TaxHelper } from '../tax/tax.helper';
import { InvoiceService } from 'vendure-plugin-invoices';

interface AdminWithChannel {
  admin_emailAddress: string;
  channel_code: string;
}

const loggerCtx = 'OrderConfirmationHandler';

/**
 * Send email to customer AND administrators of channel
 */
export const adminOrderConfirmationHandler: EmailEventHandler<any, any> =
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
      let [admins, invoice] = await Promise.all([
        getAdminsForChannel(injector, channel.id),
        injector.get(InvoiceService).getInvoice(event.order.code),
      ]);
      const channelName = admins?.[0]?.channel_code;
      admins = admins.filter((admin) => admin.admin_emailAddress.includes('@'));
      if (!admins?.[0]?.admin_emailAddress) {
        Logger.error(
          `No admin found to send confirmation email for channel with id ${channel.id}`,
          loggerCtx
        );
      }
      const adminRecipients = admins.map((admin) => admin.admin_emailAddress);
      let invoiceLink;
      if (invoice) {
        invoiceLink = `${process.env.VENDURE_HOST}/invoices/${channel.token}/${invoice.orderCode}?email=${invoice.customerEmail}`;
      }
      Logger.info(
        `Sending order confirmation email to ${adminRecipients} for channel ${channelName}`,
        loggerCtx
      );
      return { channelName, adminRecipients, invoiceLink };
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

async function getAdminsForChannel(
  injector: Injector,
  channelId: ID
): Promise<AdminWithChannel[]> {
  return injector
    .get(TransactionalConnection)
    .getRepository(Administrator)
    .createQueryBuilder('admin')
    .innerJoin('admin.user', 'user')
    .innerJoin('user.roles', 'role')
    .innerJoinAndSelect('role.channels', 'channel', 'channel.id = :channelId', {
      channelId,
    })
    .execute();
}
