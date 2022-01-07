import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  ChannelService,
  Logger,
  ProductVariantService,
  RequestContext,
} from '@vendure/core';
import { GgLoggerContext, GoedgepicktPlugin } from './goedgepickt.plugin';
import { GoedgepicktClient } from './goedgepickt.client';

@Injectable()
export class GoedgepicktService implements OnApplicationBootstrap {
  // TODO send products to GP on startup via worker!
  // TODO Get stocklevels from GP on startup

  constructor(
    private variantService: ProductVariantService,
    private channelService: ChannelService
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    for (const { channelToken } of GoedgepicktPlugin.config.configPerChannel) {
      // TODO Push a message per channel to worker
      await this.pushProducts(channelToken).catch((error) => {
        console.error(error);
        Logger.error(
          `Failed to sync products for ${channelToken}: ${error.message}`,
          GgLoggerContext
        );
      });
    }
  }

  /**
   * Push all products to Goedgepickt for channel
   */
  async pushProducts(channelToken: string): Promise<void> {
    const ctx = await this.getCtxForChannel(channelToken);
    const result = await this.variantService.findAll(ctx, {
      skip: 0,
      take: 10000,
    }); // Sensible max of 10 000 variants per channel
    if (result.totalItems > result.items.length) {
      Logger.error(
        `This plugin supports a max of ${result.items.length} variants per channel. Channel ${channelToken} has ${result.totalItems} variants. Only processing first ${result.items} variants`,
        GgLoggerContext
      );
    }
    const client = this.getClientForChannel(channelToken);
    await Promise.all(
      result.items.map(async (variant) => {
        return client
          .createProduct({
            name: variant.name,
            sku: variant.sku,
            productId: variant.sku,
            stockManagement: true,
          })
          .catch((error: Error) => {
            if (error?.message?.indexOf('already exists') > -1) {
              Logger.info(
                `Variant '${variant.name}' already exists in Goedgepickt. Skipping...`,
                GgLoggerContext
              );
            } else {
              throw error; // Throw if any other error than already exists
            }
          });
      })
    );
  }

  /**
   * Pull all stocklevels from Goedgepickt and update in Vendure
   */
  async pullStocklevels() {}

  getClientForChannel(channelToken: string): GoedgepicktClient {
    const clientConfig = GoedgepicktPlugin.config?.configPerChannel.find(
      (c) => c.channelToken === channelToken
    );
    if (!clientConfig) {
      throw Error(`No Goedgepickt config found for channel ${channelToken}`);
    }
    return new GoedgepicktClient(clientConfig);
  }

  /**
   * Creates admin context for channel
   */
  async getCtxForChannel(channelToken: string): Promise<RequestContext> {
    const channel = await this.channelService.getChannelFromToken(channelToken);
    return new RequestContext({
      apiType: 'admin',
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
    });
  }
}
