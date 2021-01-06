require('dotenv').config();
import {getRepository} from '@vendure/core'
(async () => {

    const queryBuilder = await getRepository(DealEntity, 'deal').createQueryBuilder('deal');


})();
