// Modifier le nom des colonnes
import { JSONSchemaType } from 'ajv';
import { ClientSchema } from './Types';

const clientSchema: JSONSchemaType<ClientSchema> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    address: { type: 'string' },
  },
  required: ['name', 'address'],
  additionalProperties: false,
};

const clientUpdateSchema: JSONSchemaType<ClientSchema> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    address: { type: 'string' },
  },
  required: [],
  additionalProperties: false,
};

export { clientSchema, clientUpdateSchema };