import {EmailEventHandler, EmailEventListener} from "@vendure/email-plugin";
import {OrderService, OrderStateTransitionEvent} from "@vendure/core";
import {mockOrderStateTransitionEvent} from "@vendure/email-plugin/lib/src/mock-events";
import {TaxCalculation} from "../tax/tax-calculation";

export const orderConfirmationHandler = new EmailEventListener('order-confirmation')
    .on(OrderStateTransitionEvent)
    .filter(event => event.toState === 'PaymentSettled' && !!event.order.customer)
    // .setRecipient(event => event.order.customer!.emailAddress)
    .setRecipient(event => `${event.order.customer!.emailAddress},{{ shopOwner}}`)
/*    .loadData(async ({ event, injector}) => {
        const orderService = injector.get(OrderService);
        return {somedata: 'extra'};
    })*/
    // TODO: add productName to email
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Bedankt voor je bestelling met nummer {{ order.code }}`)
    .setTemplateVars(event => {
        const summary = TaxCalculation.getTaxSummary(event.order);
        return {
            order: event.order,
            summary,
            shopOwner: 'marcdefotograaf@gmail.com'

        };
    })
    .setMockEvent(mockOrderStateTransitionEvent);

export const shopsMailHandlers: Array<EmailEventHandler<any, any>> = [
    orderConfirmationHandler
];
