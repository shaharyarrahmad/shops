import { VendureEntity } from '@vendure/core';
import { Entity, DeepPartial, Column } from 'typeorm';
@Entity()
export class ChannelConfigEntity extends VendureEntity {
  constructor(input?: DeepPartial<ChannelConfigEntity>) {
    super(input);
  }

  @Column({ unique: true })
  channelId!: string;

  @Column()
  channelName!: string;

  @Column()
  logoUrl!: string;

  @Column()
  supportEmail!: string;
}
