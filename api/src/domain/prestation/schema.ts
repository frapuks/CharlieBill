// Modifier le nom des colonnes
import { JSONSchemaType } from 'ajv';
import { PrestationSchema } from './Types';

const prestationSchema: JSONSchemaType<PrestationSchema> = {
  type: 'object',
  properties: {
    clientId: { type: 'number' },
    productId: { type: 'number' },
    date: { type: 'string' },
    name: { type: 'string' },
    quantity: { type: 'number' },
    unit_price: { type: 'number' },
    total: { type: 'number' },
  },
  required: ['clientId', 'productId', 'date', 'name', 'quantity', 'unit_price', 'total'],
  additionalProperties: false,
};

const prestationUpdateSchema: JSONSchemaType<PrestationSchema> = {
  type: 'object',
  properties: {
    clientId: { type: 'number' },
    productId: { type: 'number' },
    date: { type: 'string' },
    name: { type: 'string' },
    quantity: { type: 'number' },
    unit_price: { type: 'number' },
    total: { type: 'number' },
  },
  required: [],
  additionalProperties: false,
};

export { prestationSchema, prestationUpdateSchema };