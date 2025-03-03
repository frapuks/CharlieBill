import { JSONSchemaType } from 'ajv';
import { ProductSchema } from './Types';

const productSchema: JSONSchemaType<ProductSchema> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    price: { type: 'number' },
  },
  required: ['name', 'price'],
  additionalProperties: false,
};

const productUpdateSchema: JSONSchemaType<ProductSchema> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    price: { type: 'number' },
  },
  required: [],
  additionalProperties: false,
};

export { productSchema, productUpdateSchema };