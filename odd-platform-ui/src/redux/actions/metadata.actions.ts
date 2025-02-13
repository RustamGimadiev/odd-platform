import { createAsyncAction } from 'typesafe-actions';
import { MetadataField, MetadataFieldValue } from 'generated-sources';
import { PartialDataEntityUpdateParams } from 'redux/interfaces/dataentities';

export const createDataEntityMetadataAction = createAsyncAction(
  'POST_DATA_ENTITY_METADATA__REQUEST',
  'POST_DATA_ENTITY_METADATA__SUCCESS',
  'POST_DATA_ENTITY_METADATA__FAILURE'
)<
  undefined,
  PartialDataEntityUpdateParams<MetadataFieldValue[]>,
  undefined
>();

export const updateDataEntityMetadataAction = createAsyncAction(
  'PUT_DATA_ENTITY_METADATA__REQUEST',
  'PUT_DATA_ENTITY_METADATA__SUCCESS',
  'PUT_DATA_ENTITY_METADATA__FAILURE'
)<
  undefined,
  PartialDataEntityUpdateParams<MetadataFieldValue>,
  undefined
>();

export const deleteDataEntityMetadataAction = createAsyncAction(
  'DELETE_DATA_ENTITY_METADATA__REQUEST',
  'DELETE_DATA_ENTITY_METADATA__SUCCESS',
  'DELETE_DATA_ENTITY_METADATA__FAILURE'
)<undefined, PartialDataEntityUpdateParams<number>, undefined>();

export const searchMetadataAction = createAsyncAction(
  'GET_METADATA__REQUEST',
  'GET_METADATA__SUCCESS',
  'GET_METADATA__FAILURE'
)<undefined, MetadataField[], undefined>();
