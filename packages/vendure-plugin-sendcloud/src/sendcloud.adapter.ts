import {Order, OrderLine, ProductVariant} from '@vendure/core';
import {ParcelInput, ParcelInputItem} from './types/sendcloud-api-input.types';

/**
 * Transforms order and variants to ParcelInput
 * @param order including lines, shippingaddress and customer
 * @param variants including corresponding product
 */
export function toParcelInput(order: Order, variants: ProductVariant[]): ParcelInput {
    const items = order.lines.map(line => {
        const variant = variants.find(variant => variant.id === line.productVariant.id);
        if (!variant) {
            throw Error(`Cannot create SendCloud parcelInputItems, because productVariant with id ${line.productVariant.id} cannot be found.`);
        }
        return toParcelInputItem(line, variant);
    });
    return {
        name: `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`,
        company_name: order.shippingAddress.company,
        address: order.shippingAddress.streetLine1!,
        house_number: order.shippingAddress.streetLine2!,
        city: order.shippingAddress.city!,
        postal_code: order.shippingAddress.postalCode!,
        country: order.shippingAddress.countryCode!,
        telephone: order.customer?.phoneNumber,
        request_label: false,
        email: order.customer?.emailAddress,
        order_number: order.code,
        parcel_items: items
    }
}

/**
 * @param variant including correspon
 * @param line
 */
export function toParcelInputItem(line: OrderLine, variant: ProductVariant): ParcelInputItem {
    const weightPerUnit = ((variant.product.customFields as any)?.weight || 0) / 1000;
    return {
        description: `${variant.product.name} ${variant.name}`,
        quantity: 2,
        weight: weightPerUnit.toFixed(1),
        sku: variant.sku,
        value: (variant.priceWithTax / 100).toFixed(2)
    }
}
