// nom avec majuscule : Fxample
// nom sans majuscule : example
// Modifier le nom des colonnes
import { JSONSchemaType } from 'ajv';
import { FxampleSchema } from './Types';

const exampleSchema: JSONSchemaType<FxampleSchema> = {
  type: 'object',
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    is_goalkeeper: { type: 'boolean' },
  },
  required: ['first_name', 'last_name', 'is_goalkeeper'],
  additionalProperties: false,
};

const exampleUpdateSchema: JSONSchemaType<FxampleSchema> = {
  type: 'object',
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    is_goalkeeper: { type: 'boolean' },
  },
  required: [],
  additionalProperties: false,
};

export { exampleSchema, exampleUpdateSchema };