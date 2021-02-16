/* tslint:disable:no-non-null-assertion */
import {createTestEnvironment, registerInitializer, SqljsInitializer, testConfig} from '@vendure/testing';
import {DefaultLogger, LogLevel} from '@vendure/core';
import {initialData} from '../../test/initialData';
import {simpleCmsDevConfig} from './simple-cms.dev-config';
import {
    ContentBlock,
    ContentBlockInput,
    CREATE_CONTENTBLOCK, DELETE_CONTENTBLOCK,
    GET_CONTENTBLOCK,
    GET_CONTENTBLOCKS,
    UPDATE_CONTENTBLOCK
} from '../src';

testConfig.logger = new DefaultLogger({level: LogLevel.Debug});
registerInitializer('sqljs', new SqljsInitializer('__data__'));
const {server, adminClient, shopClient} = createTestEnvironment(simpleCmsDevConfig);

const testBlock: ContentBlockInput = {
    author: 'Martijn from Pinelab',
    title: 'This is a test title',
    slug: 'test-title-slug',
    featuredImage: 'https://pinelab.studio/images/pinelab-webshop.jpeg',
    description: 'A short description about this contentblock',
    body: '<p> This is some content and it can hold some HTML </p>'
};

let createdBlock: ContentBlock;

beforeAll(async () => {
    await server.init({
        initialData,
        productsCsvPath: '../test/products-import.csv',
    });
}, 1800 * 1000);

afterAll(async () => {
    await server.destroy();
});

describe('Simple CMS admin api', () => {

    it('Create content', async () => {
        const {createSimpleContentBlock} = await adminClient.query(CREATE_CONTENTBLOCK, {
            input: testBlock
        });
        createdBlock = createSimpleContentBlock;
        expect(createSimpleContentBlock.author).toBe(testBlock.author);
        expect(createSimpleContentBlock.title).toBe(testBlock.title);
        expect(createSimpleContentBlock.description).toBe(testBlock.description);
        expect(createSimpleContentBlock.body).toBe(testBlock.body);
        expect(createSimpleContentBlock.slug).toBe(testBlock.slug);
        expect(createSimpleContentBlock.featuredImage).toBe(testBlock.featuredImage);
    });

    it('Get single', async () => {
        const {simpleContentBlock} = await adminClient.query(GET_CONTENTBLOCK, {
            id: createdBlock.id
        });
        expect(simpleContentBlock.id).toBe(createdBlock.id);
    });

    it('Get list', async () => {
        const {simpleContentBlocks} = await adminClient.query(GET_CONTENTBLOCKS);
        expect(Array.isArray(simpleContentBlocks)).toBe(true);
        expect(simpleContentBlocks.length).toBe(1);
    });

    it('Update content', async () => {
        const {updateSimpleContentBlock} = await adminClient.query(UPDATE_CONTENTBLOCK, {
            id: createdBlock.id,
            input: {slug: 'a-better-slug'}
        });
        expect(updateSimpleContentBlock.slug).toBe('a-better-slug');
    });

});

describe('Simple CMS shop api', () => {

    it('Get list', async () => {
        const {simpleContentBlocks} = await shopClient.query(GET_CONTENTBLOCKS);
        expect(Array.isArray(simpleContentBlocks)).toBe(true);
        expect(simpleContentBlocks.length).toBe(1);
    });

});


describe('Simple CMS admin delete', () => {

    it('Delete', async () => {
        const {deleteSimpleContentBlock} = await adminClient.query(DELETE_CONTENTBLOCK, {id: createdBlock.id});
        expect(deleteSimpleContentBlock).toBe(true);
    });

});

