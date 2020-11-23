import {ShippingTaxSummaryLine, TaxSummary, ProductTaxSummaryLine, TaxTotal} from "./tax-summary";
import {Order} from "@vendure/core";

export class TaxCalculation {

    /**
     * Get taxSummary per one or multiple orders
     */
    static getTaxSummary(order: Order): TaxSummary {
        const summaryLines: ProductTaxSummaryLine[] = order.lines?.map(line =>
            ({
                name: `${line.productVariant.sku} ${line.productVariant.name}`,
                orderCode: order.code,
                quantity: line.quantity,
                unitPriceIncVAT: line.unitPriceWithTax,
                taxRate: line.productVariant?.taxRateApplied?.value || 0,
                exVAT: line.totalPrice - line.lineTax,
                incVAT: line.totalPrice,
                VAT: line.lineTax
            })
        );
        let totalIncVAT = summaryLines.map(line => line.incVAT).reduce((line1, line2) => line1 + line2);
        let totalExVAT = summaryLines.map(line => line.exVAT).reduce((line1, line2) => line1 + line2);
        let totalVAT = summaryLines.map(line => line.VAT).reduce((line1, line2) => line1 + line2);
        // Calculate shipping
        const maxTax = Math.max(...summaryLines.map(line => line.taxRate));
        const taxMultiplier = maxTax / 100 + 1; // I.E. 21% = 1.21
        const shippingExVAT = order.shipping / taxMultiplier;
        const shipping: ShippingTaxSummaryLine = {
            name: `Shipping ${maxTax}% ${order.code}`,
            orderCode: order.code,
            taxRate: maxTax,
            incVAT: order.shipping,
            exVAT: this.round(shippingExVAT),
            VAT: this.round(order.shipping - shippingExVAT)
        };
        // Calculate totals inc shipping
        totalIncVAT += shipping.incVAT;
        totalExVAT += shipping.exVAT;
        totalVAT += shipping.VAT;
        // Calculate total taxes spend
        const taxTotal: TaxTotal = {};
        summaryLines.forEach(line => {
            let total = taxTotal[line.taxRate] || 0;
            total += line.VAT;
            taxTotal[line.taxRate] = total;
        });
        taxTotal[shipping.taxRate] += shipping.VAT;
        return {
            products: summaryLines,
            shipping: [shipping],
            taxTotal,
            totalIncVAT: this.round(totalIncVAT),
            totalExVAT: this.round(totalExVAT),
            totalVAT: this.round(totalVAT)
        };
    }

    /**
     * Round to whole numbers, because cents
     */
    static round(nr: number): number {
        return Math.round(nr || 0);
    }
}