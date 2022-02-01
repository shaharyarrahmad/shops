import { compileUiExtensions, setBranding } from '@vendure/ui-devkit/compiler';
import * as path from 'path';
import { WebhookPlugin } from 'vendure-plugin-webhook';
import { MyparcelPlugin } from 'vendure-plugin-myparcel/dist/myparcel.plugin';

compileUiExtensions({
  outputPath: path.join(__dirname, '__admin-ui'),
  extensions: [
    WebhookPlugin.ui,
    MyparcelPlugin.ui,
    setBranding({
      // The small logo appears in the top left of the screen
      smallLogoPath: path.join(__dirname, 'admin-branding/favicon.png'),
      // The large logo is used on the login page
      largeLogoPath: path.join(__dirname, 'admin-branding/logo.png'),
      faviconPath: path.join(__dirname, 'admin-branding/favicon.png'),
    }),
  ],
})
  .compile?.()
  .then(() => {
    process.exit(0);
  });
