require('dotenv').config({ path: process.env.LOCAL_ENV || '.env.test' });

import {
  generateMigration,
  revertLastMigration,
  runMigrations,
} from '@vendure/core';
import program from 'commander';
import { config } from './src/vendure-config';

console.log(
  `\x1b[46mMIGRATINg FOR DATABASE ${process.env.DATABASE_NAME} \x1b[0m`
);

program
  .command('generate <name>')
  .description('Generate a new migration file with the given name')
  .action((name) => {
    return generateMigration(config, { name, outputDir: './migrations' });
  });

program
  .command('run')
  .description('Run all pending migrations')
  .action(() => {
    return runMigrations(config);
  });

program
  .command('revert')
  .description('Revert the last applied migration')
  .action(() => {
    return revertLastMigration(config);
  });

program.parse(process.argv);
