import { EmailEventHandler, EmailEventListener } from '@vendure/email-plugin';
import { EntityHydrator, ID, Logger, OrderPlacedEvent } from '@vendure/core';
import axios from 'axios';
import tmp from 'tmp';

interface EBook {
  filename: string;
  url: string;
}

const loggerCtx = 'EBookEmailHandler';

/**
 * Send e-book as PDF via email
 * Variant SKU should contain the string 'e-book' for this handler
 */
export const ebookEmailHandler: EmailEventHandler<any, any> =
  new EmailEventListener('e-book')
    .on(OrderPlacedEvent)
    .filter(event => event.order.lines.some(line => line.productVariant.sku.indexOf('e-book') > -1))
    .loadData(async ({ event, injector }) => {
      // Find and download all e-books
      let variants = event.order.lines.map(line => line.productVariant);
      await Promise.all(variants.map(variant => injector.get(EntityHydrator).hydrate(event.ctx, variant, { relations: ['product', 'product.facetValues'] })));
      const ebooks: EBook[] = [];
      variants.forEach(variant => {
        const url = variant.product.facetValues.find(facet => facet.code === 'e-book')?.name;
        const filename = variant.product.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        if (!url) {
          Logger.error(`Product ${variant.product.slug} does not have a facetValue 'e-book' with a URL set. Not emailing e-book to customer.`, loggerCtx);
          return;
        }
        ebooks.push({ filename, url });
      });
      if (ebooks.length == 0) {
        const message = `This order should have e-books, but no e-books could be found for order ${event.order.code}`;
        Logger.error(message, loggerCtx);
        throw Error(message);
      }
      return { channelName: event.ctx.channel, ebooks };
    })
    .setRecipient((event) => event.order.customer!.emailAddress)
    .setFrom(`{{ fromAddress }}`)
    .setSubject(
      `Je e-book van bestelling {{ order.code }} bij {{ channelName }}`
    )
    .setTemplateVars((event) => {
      return {
        order: event.order,
        ...event.data
      };
    })
    .setAttachments(async (event) => {
      try {
        await Promise.all(event.data.ebooks.map(async ebook => {
          const tmpFile = tmp.fileSync();
          const res = await axios({
            url: ebook.url,
            method: 'GET',
            responseType: 'blob', // important
          });
          res.data.
        }));
        console.log('eventt', event.data);
        /*        const taxes = TaxHelper.getTaxes(event.order);
                const pdfPath = await createPdfReceipt(event.order, taxes);
                return [{
                  filename: `${event.order.code}.pdf`,
                  path: pdfPath,
                }];*/
        return [];
      } catch (e) {
        Logger.error(`Failed to attach e-book PDF for ${event.order.code}`, loggerCtx, e);
        return [];
      }
    });