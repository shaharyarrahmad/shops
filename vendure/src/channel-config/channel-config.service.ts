import {Injectable} from '@nestjs/common';
import {ID, TransactionalConnection} from '@vendure/core';
import {ChannelConfigEntity} from './channel-config.entity';
import {Repository} from 'typeorm';

/**
 * In our multi-tenant environment, we need some additional config per channel.
 */
@Injectable()
export class ChannelConfigService {

    readonly repo: Repository<ChannelConfigEntity>

    constructor(private connection: TransactionalConnection) {
        this.repo = this.connection.getRepository(ChannelConfigEntity);
    }

    async get(channelId: string | ID): Promise<ChannelConfigEntity> {
        const config = await this.repo.findOne({channelId: channelId as string});
        if (!config) {
            throw Error(`No ChannelConfig found for channelId ${channelId}`);
        }
        return config;
    }

    async create(config: Partial<ChannelConfigEntity>): Promise<ChannelConfigEntity> {
        return this.repo.save(config);
    }

}