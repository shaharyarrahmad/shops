import {Column, Entity} from 'typeorm';
import {DeepPartial, VendureEntity} from '@vendure/core';

@Entity()
export class ContentBlock extends VendureEntity {

    /**
     * Store a channelId instead of a relation to keep the main vendure DB schema seperate from plugin schema
     */
    @Column({unique: true})
    channelId!: string;
    @Column({nullable: true})
    author?: string
    @Column()
    title!: string
    @Column()
    slug!: string
    @Column({nullable: true})
    group?: string
    @Column({nullable: true})
    featuredImage?: string
    @Column()
    body!: string
    @Column()
    description!: string

    constructor(input?: DeepPartial<ContentBlock>) {
        super(input);
    }
}