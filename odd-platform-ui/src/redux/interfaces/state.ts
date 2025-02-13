import { ThunkAction } from '@reduxjs/toolkit';
import { ActionType } from 'typesafe-actions';
import { Dictionary } from 'lodash';
import {
  DataSource,
  DataEntity,
  DataEntityDetails,
  MetadataField,
  Tag,
  Label,
  MetadataFieldValue,
  Owner,
  DataSetField,
  DataSetVersion,
  Ownership,
  DataEntityType,
  DataEntitySubType,
  DataEntityRef,
  AssociatedOwner,
} from 'generated-sources';
import * as actions from 'redux/actions';
import { LoaderState } from './loader';
import { DataSetStructureTypesCount } from './datasetStructure';
import {
  SearchTotalsByName,
  SearcFacetsByName,
  FacetOptionsByName,
} from './search';
import { DataEntityLineageById } from './dataentityLineage';
import { CurrentPageInfo } from './common';

export interface DataSourcesState {
  byId: { [dataSourceId: string]: DataSource };
  allIds: number[];
  pageInfo?: CurrentPageInfo;
}

export interface TagsState {
  byId: { [tagId: number]: Tag };
  allIds: number[];
  pageInfo?: CurrentPageInfo;
}

export interface LabelsState {
  byId: { [labelId: number]: Label };
  allIds: number[];
  pageInfo?: CurrentPageInfo;
}

export interface MetaDataState {
  dataEntityMetadata: {
    [dataEntityId: string]: {
      byId: { [metadataFiledId: string]: MetadataFieldValue };
      allIds: number[];
    };
  };
  metadataFields: MetadataField[];
}

export interface DatasetStructureState {
  fieldById: {
    [fieldId: number]: DataSetField;
  };
  allFieldIdsByVersion: {
    [versionId: number]: {
      [parentFieldId: number]: DataSetField['id'][];
    };
  };
  statsByVersionId: {
    [versionId: number]: DataSetStructureTypesCount;
  };
  latestVersionByDataset: {
    [datasetId: string]: DataSetVersion['id'];
  };
}

export interface DataEntityLineageState {
  [dataEntityId: string]: DataEntityLineageById;
}

export interface OwnersState {
  byId: { [ownerId: number]: Owner };
  allIds: number[];
  pageInfo?: CurrentPageInfo;
  ownership: {
    [dataEntityId: string]: {
      byId: { [ownershipId: string]: Ownership };
      allIds: number[];
    };
  };
}

export interface DataEntitiesState {
  byId: {
    [dataEntityId: string]: DataEntity & DataEntityDetails;
  };
  allIds: number[];
  my: DataEntityRef[];
  myUpstream: DataEntityRef[];
  myDownstream: DataEntityRef[];
  popular: DataEntityRef[];
  typesDict: {
    types: Dictionary<DataEntityType>;
    subtypes: Dictionary<DataEntitySubType>;
  };
}

export interface SearchState {
  searchId: string;
  query: string;
  myObjects: boolean;
  facets: FacetOptionsByName;
  isFacetsStateSynced: boolean;
  totals: SearchTotalsByName;
  results: {
    items: DataEntity[];
    pageInfo: CurrentPageInfo;
  };
  facetState: SearcFacetsByName;
}

export interface ProfileState {
  owner?: AssociatedOwner;
}

export type RootState = {
  dataSources: DataSourcesState;
  search: SearchState;
  loader: LoaderState;
  dataEntities: DataEntitiesState;
  tags: TagsState;
  metaData: MetaDataState;
  owners: OwnersState;
  datasetStructure: DatasetStructureState;
  labels: LabelsState;
  dataEntityLineage: DataEntityLineageState;
  profile: ProfileState;
};

export type Action = ActionType<typeof actions>;

export type ThunkResult<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  Action
>;

export type PromiseThunkResult<ReturnType = void> = ThunkResult<
  Promise<ReturnType>
>;
