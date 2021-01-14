# Vendure Webhook plugin
Triggers a channel aware webhook based on configured events. 
Events are specified in `vendure-config` and webhooks are configured in the database via the admin UI.

## Database entity
The plugin adds an entity `WebhookPerChannelEntity` to your database.
Don't forget to run a migration OR `synchronize: true` if you like living on the edge.

## Vendure config
Configure events:
```js
    plugins: [
        WebhookPlugin.init({httpMethod: 'POST', events: [ProductEvent, ProductVariantChannelEvent, ProductVariantEvent]})
    ]
```
Add admin-ui:
```js
        AdminUiPlugin.init({
            app: compileUiExtensions({
                devMode: true,
                outputPath: path.join(__dirname, '__admin-ui'),
                extensions: [WebhookPlugin.ui]
            }),
        }),
```
This will add a formfield for updating the webhook for the current channel under `Settings`:"
![Webhook admin UI](../../../docs/webhook-admin-ui.jpeg)
For more information about using pre-compiled admin UI in production: https://www.vendure.io/docs/plugins/extending-the-admin-ui/ 