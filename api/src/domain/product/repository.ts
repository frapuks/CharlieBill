// nom avec majuscule : Product
//~ Import module
import { CoreRepository } from '../core/coreRepository.js';
import { PGProductData } from './datamapper.js';

class ProductRepository extends CoreRepository {
    dataRepository = PGProductData;
}

const ProductData = new ProductRepository();
export { ProductData };