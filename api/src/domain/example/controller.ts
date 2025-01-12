// nom avec majuscule : Fxample
// nom sans majuscule : example
//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');
import { CoreController } from '../core/coreController.js';
import { Fxample } from './model.js';

class FxampleController extends CoreController {
  model = Fxample;
  paramsId = 'exampleId';
}

const example = new FxampleController();
export { example };