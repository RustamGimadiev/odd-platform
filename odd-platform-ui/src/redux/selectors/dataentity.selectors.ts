import { createSelector } from 'reselect';
import { get } from 'lodash';
import { RootState, DataEntitiesState } from 'redux/interfaces';
import { DataEntityTypeNameEnum } from 'generated-sources';
import { createFetchingSelector } from 'redux/selectors/loader-selectors';

const dataEntitiesState = ({
  dataEntities,
}: RootState): DataEntitiesState => dataEntities;

const getDataEntitiesListFetchingStatus = createFetchingSelector(
  'GET_DATA_ENTITIES'
);

const getMyDataEntitiesFetchingStatus = createFetchingSelector(
  'GET_MY_DATA_ENTITIES'
);

const getMyUpstreamDataEntitiesFetchingStatus = createFetchingSelector(
  'GET_MY_UPSTREAM_DATA_ENTITIES'
);

const getMyDownstreamFetchingStatus = createFetchingSelector(
  'GET_MY_DOWNSTREAM_DATA_ENTITIES'
);

const getPopularDataEntitiesFetchingStatus = createFetchingSelector(
  'GET_POPULAR_DATA_ENTITIES'
);

export const getMyDataEntitiesFetching = createSelector(
  getMyDataEntitiesFetchingStatus,
  status => status === 'fetching'
);

export const getMyUpstreamDataEntitiesFetching = createSelector(
  getMyUpstreamDataEntitiesFetchingStatus,
  status => status === 'fetching'
);

export const getMyDownstreamDataEntitiesFetching = createSelector(
  getMyDownstreamFetchingStatus,
  status => status === 'fetching'
);

export const getPopularDataEntitiesFetching = createSelector(
  getPopularDataEntitiesFetchingStatus,
  status => status === 'fetching'
);

export const getDataEntitiesListFetching = createSelector(
  getDataEntitiesListFetchingStatus,
  status => status === 'fetching'
);

export const getDataEntitiesListFetched = createSelector(
  getDataEntitiesListFetchingStatus,
  status => status === 'fetched'
);

const dataEntityTypeName = (
  _: RootState,
  entityTypeName: DataEntityTypeNameEnum
) => entityTypeName;

export const getDataEntityTypeId = createSelector(
  dataEntitiesState,
  dataEntityTypeName,
  (dataEntities, entityTypeName) =>
    get(dataEntities, `typesDict.types.${entityTypeName}.id`)
);

export const getDataEntityTypesByName = createSelector(
  dataEntitiesState,
  dataEntities => dataEntities.typesDict.types
);

export const getDataEntitiesList = createSelector(
  getDataEntitiesListFetched,
  dataEntitiesState,
  (isFetched, dataEntities) => {
    if (!isFetched) {
      return [];
    }
    return dataEntities.allIds.map(id => dataEntities.byId[id]);
  }
);

export const getMyEntities = createSelector(
  dataEntitiesState,
  dataEntities => dataEntities.my
);

export const getMyEntitiesDownstream = createSelector(
  dataEntitiesState,
  dataEntities => dataEntities.myDownstream
);

export const getMyEntitiesUpstream = createSelector(
  dataEntitiesState,
  dataEntities => dataEntities.myUpstream
);

export const getPopularEntities = createSelector(
  dataEntitiesState,
  dataEntities => dataEntities.popular
);
// Details
const getDataEntityDetailsFetchingStatus = createFetchingSelector(
  'GET_DATA_ENTITY'
);

export const getDataEntityDetailsFetching = createSelector(
  getDataEntityDetailsFetchingStatus,
  status => status === 'fetching'
);

export const getDataEntityDetailsFetched = createSelector(
  getDataEntityDetailsFetchingStatus,
  status => status === 'fetched'
);

const getDataEntityTagsUpdateStatus = createFetchingSelector(
  'PUT_DATA_ENTITY_TAGS'
);

export const getDataEntityTagsUpdating = createSelector(
  getDataEntityTagsUpdateStatus,
  status => status === 'fetching'
);

const getDataEntityOwnerUpdateStatus = createFetchingSelector(
  'PUT_DATA_ENTITY_OWNER'
);

export const getDataEntityOwnerUpdating = createSelector(
  getDataEntityOwnerUpdateStatus,
  status => status === 'fetching'
);

const getDataEntityInternalNameUpdateStatus = createFetchingSelector(
  'PUT_DATA_ENTITY_INTERNAL_NAME'
);

export const getDataEntityInternalNameUpdating = createSelector(
  getDataEntityInternalNameUpdateStatus,
  status => status === 'fetching'
);

export const getDataEntityId = (
  _: RootState,
  dataEntityId: number | string
) => dataEntityId;

export const getDataEntityDetails = createSelector(
  dataEntitiesState,
  getDataEntityId,
  (dataEntities, dataEntityId) => dataEntities.byId[dataEntityId]
);

export const getDataEntityTags = createSelector(
  dataEntitiesState,
  getDataEntityId,
  (dataEntities, dataEntityId) =>
    dataEntities.byId[dataEntityId]?.tags || []
);

export const getDataEntityInternalDescription = createSelector(
  getDataEntityDetails,
  dataEntityDetails => dataEntityDetails.internalDescription
);

export const getDataEntityExternalDescription = createSelector(
  getDataEntityDetails,
  dataEntityDetails => dataEntityDetails.externalDescription
);

export const getDatasetVersions = createSelector(
  dataEntitiesState,
  getDataEntityId,
  (dataEntities, dataEntityId) =>
    dataEntities.byId[dataEntityId]?.versionList
);

export const getDatasetStats = createSelector(
  dataEntitiesState,
  getDataEntityId,
  (dataEntities, dataEntityId) => dataEntities.byId[dataEntityId]?.stats
);

export const getDataEntityInternalName = createSelector(
  dataEntitiesState,
  getDataEntityId,
  (dataEntities, dataEntityId) =>
    dataEntities.byId[dataEntityId]?.internalName
);
