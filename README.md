[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# Pinelab Shop platform

This repository holds all components needed to run the Pinelab Shops multi-tenant e-commerce platform.

* `vendure` the Vendure backend.
* `clients/*` holds the client specific storefronts
* `packages/e2e` e2e test to test basic functionality on minishop.studio demo shop
* `packages/pinelab-storefront-client` Frontend library used in all webshop frontends based on Buefy (Bulma)

## Setting up a new shop
See [Trello](https://trello.com/c/Ij0bDrCh/362-shop-checklist) for more detail on the components of a new storefront. 

### Vendure setup

1. Create channel by running `yarn script:test script/create-channel.ts` in directory `vendure`
2. Create products. Products can also be imported with the script `vendure/script/import-products.ts`
3. Optional: assign plugin permissions to the created role.
4. Create admin user for channel and assign the role
5. Set a Mollie API key via the admin UI

### Storefront setup

1. Create a new directory `clients/<new-client-name>`
2. Create a Netlify build hook and add the URL in the Vendure Admin via Settings > webhook. This will make sure the site
   redeploys on changes. 

### Optional steps

1. Setup content via content.pinelab.studio. This is the Directus interface for non-product content.
2. Add the same Netlify build hook in Directus.

# Pinelab principles

1. One fan a day: Try to do something unexpected every day for 1 customer of Pinelab to create a fanbase.
2. Keep it simple. You aren't going to need it. Don't implement it now because you assume you will need it later.
3. Write code for humans, not machines. Minor performance trade-offs are fine when they make your code more readable.
4. What is the impact of this new feature? Is it easily reverted? Will future code have to deal with it? Every addition takes a toll: be careful what you add, even when a client wants it.
5. 80/20 rule: If 80% of the clients can use it, implement it in the platform. Otherwise, separate it, charge more for it or just don't do it.
6. Make a developer happy: document in code (README, JsDoc), no one maintains external docs! You can even add images in Markdown...
7. Try to keep things stateless: avoid new database entities. Avoid cronjobs where possible