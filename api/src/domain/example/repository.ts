// nom avec majuscule : Fxample
//~ Import module
import { CoreRepository } from '../core/coreRepository.js';
import { PGFxampleData } from './datamapper.js';

class FxampleRepository extends CoreRepository {
    dataRepository = PGFxampleData;
}

const FxampleData = new FxampleRepository();
export { FxampleData };