import { ExportInput, ExportStrategy } from 'vendure-plugin-order-export';
import path from 'path';
import os from 'os';
import { Logger, Order } from '@vendure/core';
import { createObjectCsvWriter } from 'csv-writer';
import { TaxHelper } from './tax.helper';
import { promises as fs } from 'fs';

const loggerCtx = 'TaxExportStrategy';

export interface OrderRow {
  code: string;
  date: string;
  orderTotal: string;
  orderTotalWithTax: string;

  [key: string]: string;
}

export class TaxExportStrategy implements ExportStrategy {
  readonly name = 'btw-export';
  readonly contentType = 'text/csv';
  readonly fileExtension = 'csv';

  async createExportFile({
    ctx,
    startDate,
    endDate,
    orderService,
  }: ExportInput): Promise<string> {
    const orders: Order[] = [];
    let hasMoreOrders = true;
    let skip = 0;
    while (hasMoreOrders) {
      const orderList = await orderService.findAll(ctx, {
        filter: {
          orderPlacedAt: {
            between: {
              start: startDate,
              end: endDate,
            },
          },
          state: {
            in: ['Delivered', 'Shipped', 'PaymentSettled'],
          },
        },
        skip,
      });
      Logger.info(
        `Fetched orders ${skip} - ${orderList.items.length}`,
        loggerCtx
      );
      orders.push(...orderList.items);
      skip += orderList.items.length;
      hasMoreOrders = orderList.totalItems > skip;
    }
    Logger.info(
      `Exporting ${orders.length} orders from ${startDate} to ${endDate}`,
      loggerCtx
    );
    const uniqueTaxRates = new Set<string>();
    const totalTaxOfAllOrders: Record<string, number> = {};
    const rows: OrderRow[] = orders.map((order) => {
      const { taxTotal } = TaxHelper.getTaxSummary(order);
      Object.keys(taxTotal).forEach((taxRate) => uniqueTaxRates.add(taxRate));
      const formattedTaxTotal: any = {};
      Object.entries(taxTotal).forEach(([key, value]) => {
        formattedTaxTotal[key] = this.formatCurrency(value);
        const existingTotal = totalTaxOfAllOrders[key] || 0;
        totalTaxOfAllOrders[key] = existingTotal + value;
      });
      return {
        code: order.code,
        date: order.orderPlacedAt?.toLocaleDateString('nl-NL') || '',
        orderTotal: this.formatCurrency(order.total),
        orderTotalWithTax: this.formatCurrency(order.totalWithTax),
        ...formattedTaxTotal,
      };
    });
    // Write to file
    const fileName = `${new Date().getTime()}-${startDate.getTime()}-${endDate.getTime()}.${
      this.fileExtension
    }`;
    const exportFile = path.join(os.tmpdir(), fileName);
    const csvWriter = createObjectCsvWriter({
      path: exportFile,
      header: [
        { id: 'total', title: 'totalen' },
        { id: 'code', title: 'bestelling' },
        { id: 'date', title: 'datum' },
        { id: 'orderTotal', title: 'totaal excl. btw' },
        { id: 'orderTotalWithTax', title: 'totaal incl. btw' },
        // Taxrate headers, 9% 21% etc
        ...Array.from(uniqueTaxRates).map((rate) => ({
          id: rate,
          title: `${rate}%`,
        })),
      ],
    });
    const totalOfOrdersRecords = Object.entries(totalTaxOfAllOrders).map(
      ([key, value]) => ({
        total: `Totaal ${key}% BTW: ${this.formatCurrency(value)}`,
      })
    );
    await csvWriter.writeRecords(totalOfOrdersRecords);
    await csvWriter.writeRecords(rows);
    return exportFile;
  }

  private formatCurrency(value: number): string {
    return (value / 100).toFixed(2);
  }
}
