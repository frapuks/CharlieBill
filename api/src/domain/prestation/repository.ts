// nom avec majuscule : Prestation
//~ Import module
import { CoreRepository } from '../core/coreRepository.js';
import { PGPrestationData } from './datamapper.js';

class PrestationRepository extends CoreRepository {
    dataRepository = PGPrestationData;
}

const PrestationData = new PrestationRepository();
export { PrestationData };