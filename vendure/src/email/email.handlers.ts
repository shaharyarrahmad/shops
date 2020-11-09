import {EmailEventHandler, EmailEventListener} from "@vendure/email-plugin";
import {OrderStateTransitionEvent} from "@vendure/core";
import {mockOrderStateTransitionEvent} from "@vendure/email-plugin/lib/src/mock-events";

export const orderConfirmationHandler = new EmailEventListener('order-confirmation')
    .on(OrderStateTransitionEvent)
    .filter(event => event.toState === 'PaymentSettled' && !!event.order.customer)
    .setRecipient(event => event.order.customer!.emailAddress)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`Order confirmation for #{{ order.code }}`)
    .setTemplateVars(event => ({ order: event.order }))
    .setMockEvent(mockOrderStateTransitionEvent);

export const shopsMailHandlers: Array<EmailEventHandler<any, any>> = [
    orderConfirmationHandler
];
