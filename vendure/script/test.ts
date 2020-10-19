require('dotenv').config();
import {GoogleStorageStrategy} from '../src/google-storage-assets/google-storage-strategy';

const data = new Buffer('Dit is een test');
const strat = new GoogleStorageStrategy('pinelab-shops-assets');
strat.writeFileFromBuffer('test1234.txt', data).then(ding => console.log(ding));
