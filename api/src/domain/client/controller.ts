//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');
import { CoreController } from '../core/coreController.js';
import { Client } from './model.js';

class ClientController extends CoreController {
  model = Client;
  paramsId = 'clientId';
}

const client = new ClientController();
export { client };