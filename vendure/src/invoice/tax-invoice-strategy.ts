import { DataFnInput, InvoiceData } from 'vendure-plugin-invoices';
import { TaxHelper } from '../tax/tax.helper';
import { DefaultDataStrategy } from 'vendure-plugin-invoices/dist/api/strategies/default-data-strategy';

export class TaxInvoiceStrategy extends DefaultDataStrategy {
  async getData(input: DataFnInput): Promise<InvoiceData> {
    const defaultData = await super.getData(input);
    const summary = TaxHelper.getTaxSummary(input.order);
    const eboekhoudenSummary = TaxHelper.getEBoekhoudenTaxSummary(input.order);
    return {
      ...defaultData,
      summary,
      eboekhoudenSummary,
    };
  }
}
