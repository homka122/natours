import * as dotenv from 'dotenv';
import __dirname from './utils/dirname.js';

if (process.argv[2] === '--dev') {
  dotenv.config({ path: `${__dirname}/config.dev.env` });
} else {
  dotenv.config({ path: `${__dirname}/config.prod.env` });
}
