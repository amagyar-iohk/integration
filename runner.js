#!/usr/bin/env node
const yargs = require('yargs')
require('ts-node/register');

const { run } = require('./src/index.ts')

const { component, env } = yargs().parse(process.argv.slice(2));
run(component, env)
