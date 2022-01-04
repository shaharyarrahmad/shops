'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv').config({ path: process.env.LOCAL_ENV || '.env.test' });
const core_1 = require('@vendure/core');
const commander_1 = __importDefault(require('commander'));
const vendure_config_1 = require('./src/vendure-config');
console.log(
  `\x1b[46mMIGRATINg FOR DATABASE ${process.env.DATABASE_NAME} \x1b[0m`
);
commander_1.default
  .command('generate <name>')
  .description('Generate a new migration file with the given name')
  .action((name) => {
    return core_1.generateMigration(vendure_config_1.config, {
      name,
      outputDir: './migrations',
    });
  });
commander_1.default
  .command('run')
  .description('Run all pending migrations')
  .action(() => {
    return core_1.runMigrations(vendure_config_1.config);
  });
commander_1.default
  .command('revert')
  .description('Revert the last applied migration')
  .action(() => {
    return core_1.revertLastMigration(vendure_config_1.config);
  });
commander_1.default.parse(process.argv);
