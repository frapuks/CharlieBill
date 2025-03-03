//~ Import module
import { CoreRepository } from '../core/coreRepository.js';
import { PGClientData } from './datamapper.js';

class ClientRepository extends CoreRepository {
    dataRepository = PGClientData;
}

const ClientData = new ClientRepository();
export { ClientData };