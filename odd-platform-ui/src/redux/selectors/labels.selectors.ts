import { createSelector } from 'reselect';
import { RootState } from 'redux/interfaces';
import { createFetchingSelector } from 'redux/selectors/loader-selectors';
import { LabelsState } from 'redux/interfaces/state';

const labelsState = ({ labels }: RootState): LabelsState => labels;

const getLabelsListFetchingStatus = createFetchingSelector('GET_TAGS');
export const getLabelsCreateStatus = createFetchingSelector('POST_TAGS');
export const getLabelUpdateStatus = createFetchingSelector('PUT_TAG');
export const deleteLabelsUpdateStatus = createFetchingSelector(
  'DELETE_TAG'
);

export const getIsLabelsListFetching = createSelector(
  getLabelsListFetchingStatus,
  status => status === 'fetching'
);

export const getLabelsList = createSelector(labelsState, labels =>
  labels.allIds.map(id => labels.byId[id])
);

export const getIsLabelCreating = createSelector(
  getLabelsCreateStatus,
  status => status === 'fetching'
);

export const getIsLabelUpdating = createSelector(
  getLabelUpdateStatus,
  status => status === 'fetching'
);

export const getIsLabelDeleting = createSelector(
  deleteLabelsUpdateStatus,
  status => status === 'fetching'
);

export const getLabelsListPage = createSelector(
  labelsState,
  labelsList => labelsList.pageInfo
);
