# Vendure backend
This directory holds the Vendure backend for the Pinelab Shops platform.

## Development

```
yarn serve:test
// or production
yarn serve:prod
```

## Migrations

[Migrations](https://www.vendure.io/docs/developer-guide/migrations/) allow safe updates to the database schema.

The following npm scripts can be used to generate migrations:

```
yarn migration:generate [name]
```

run any pending migrations that have been generated:

```
yarn migration:run
```

and revert the most recently-applied migration:

```
yarn migration:revert
```

### Copying prod DB to test
```bash 
# https://console.cloud.google.com/transfer/cloud/jobs

mysqldump --column-statistics=0 -u username123 -h 1.1.1.1 -p prod-db-naame > prod.sql
mysql -u username123 -h 1.1.1.1 -p test < prod.sql
```