import { Order } from '@vendure/core';

/**
 * Tax summary for one or multiple orders
 */
export interface TaxSummary {
  taxTotal: TaxTotal;
  totalVAT: number;
  totalExVAT: number;
  totalIncVAT: number;
}

export interface TaxTotal {
  [key: number]: number;
}

export class TaxHelper {
  /**
   * Get taxSummary per order
   */
  static getTaxSummary(order: Order): TaxSummary {
    const taxTotal: TaxTotal = {};
    order.taxSummary.forEach((summary) => {
      if (summary.taxRate > 0) {
        taxTotal[summary.taxRate] = summary.taxTotal;
      }
    });
    return {
      taxTotal,
      totalIncVAT: order.totalWithTax,
      totalExVAT: order.total,
      totalVAT: order.totalWithTax - order.total,
    };
  }
}
