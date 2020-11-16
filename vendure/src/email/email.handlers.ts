import {EmailEventHandler, EmailEventListener} from "@vendure/email-plugin";
import {OrderService, OrderStateTransitionEvent} from "@vendure/core";
import {mockOrderStateTransitionEvent} from "@vendure/email-plugin/lib/src/mock-events";
import {TaxCalculation} from "../tax/tax-calculation";
import {channelConfig} from "../channel-config/channel-config";

export const orderConfirmationHandler = new EmailEventListener('order-confirmation')
    .on(OrderStateTransitionEvent)
    .filter(event => event.toState === 'PaymentSettled' && !!event.order.customer)
    // .setRecipient(event => event.order.customer!.emailAddress)
    .loadData(async ({ event, injector}) => {
        const config = channelConfig.find(c => c.channelToken === event.ctx.channel.token);
        return {config};
    })
    .setRecipient(event => `${event.order.customer!.emailAddress},${event.data.config?.supportEmail}`)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Bedankt voor je bestelling bij {{ channelName }} met nr. {{ order.code }}`)
    .setTemplateVars(event => {
        const summary = TaxCalculation.getTaxSummary(event.order);
        return {
            order: event.order,
            summary,
            ...(event.data.config ? event.data.config : {})
        };
    });

export const shopsMailHandlers: Array<EmailEventHandler<any, any>> = [
    orderConfirmationHandler
];
