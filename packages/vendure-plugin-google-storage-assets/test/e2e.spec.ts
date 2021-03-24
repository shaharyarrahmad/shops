import {
  createTestEnvironment,
  registerInitializer,
  SqljsInitializer,
  testConfig,
} from '@vendure/testing';
import gql from 'graphql-tag';
import { DefaultLogger, LogLevel } from '@vendure/core';
import { GoogleStorageStrategy } from '../src/google-storage-strategy';
import { initialData } from '../../test/initialData';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import path from 'path';
import { GoogleStoragePlugin } from '../src/google-storage-plugin';

describe('Google Storage assets', () => {
  testConfig.logger = new DefaultLogger({ level: LogLevel.Debug });
  registerInitializer('sqljs', new SqljsInitializer('__data__'));
  testConfig.plugins.push(
    AssetServerPlugin.init({
      storageStrategyFactory: () =>
        new GoogleStorageStrategy({
          bucketName: 'pinelab-shops-test-assets',
        }),
      route: 'assets',
      assetUploadDir: '/tmp/vendure/assets',
    })
  );
  testConfig.plugins.push(GoogleStoragePlugin);
  const { server, adminClient, shopClient } = createTestEnvironment(testConfig);

  let createdAssetId: string;

  beforeAll(async () => {
    await server.init({
      initialData,
      productsCsvPath: '../test/products-import.csv',
    });
  }, 1800 * 1000);

  afterAll(async () => {
    await server.destroy();
  });

  it('Upload asset', async () => {
    await adminClient.asSuperAdmin();
    const filesToUpload = [path.join(__dirname, 'tech.jpeg')];
    const { createAssets } = await adminClient.fileUploadMutation({
      mutation: CREATE_ASSETS,
      filePaths: filesToUpload,
      mapVariables: (filePaths) => ({
        input: filePaths.map((p) => ({ file: null })),
      }),
    });
    console.log(createAssets);
    createdAssetId = createAssets[0].id;
    expect(createAssets.length).toBe(1);
    expect(createAssets[0].thumbnail.endsWith('_thumbnail.jpg')).toBe(true);
  });
});

export const CREATE_ASSETS = gql`
  mutation createAssets($input: [CreateAssetInput!]!) {
    createAssets(input: $input) {
      ... on Asset {
        id
        name
        fileSize
        mimeType
        type
        preview
        source
        thumbnail
        focalPoint {
          x
          y
        }
      }
      ... on MimeTypeError {
        message
        fileName
        mimeType
      }
    }
  }
`;
