//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');
import { CoreController } from '../core/coreController.js';
import { Prestation } from './model.js';

class PrestationController extends CoreController {
  model = Prestation;
  paramsId = 'prestationId';
}

const prestation = new PrestationController();
export { prestation };