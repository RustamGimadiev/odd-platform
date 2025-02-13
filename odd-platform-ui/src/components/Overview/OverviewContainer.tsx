import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from 'redux/interfaces';
import {
  getMyEntities,
  getMyEntitiesUpstream,
  getPopularEntities,
  getMyEntitiesDownstream,
  getMyDataEntitiesFetching,
  getMyUpstreamDataEntitiesFetching,
  getMyDownstreamDataEntitiesFetching,
  getPopularDataEntitiesFetching,
} from 'redux/selectors/dataentity.selectors';
import {
  fetchMyDataEntitiesList,
  fetchMyUpstreamDataEntitiesList,
  fetchMyDownstreamDataEntitiesList,
  fetchPopularDataEntitiesList,
} from 'redux/thunks/dataentities.thunks';
import { fetchIdentity } from 'redux/thunks/profile.thunks';
import {
  getIdentity,
  getIdentityFetched,
} from 'redux/selectors/profile.selectors';
import Overview from './Overview';
import { styles } from './OverviewStyles';

const mapStateToProps = (state: RootState) => ({
  identity: getIdentity(state),
  identityFetched: getIdentityFetched(state),
  myEntities: getMyEntities(state),
  myEntitiesDownstream: getMyEntitiesDownstream(state),
  myEntitiesUpstream: getMyEntitiesUpstream(state),
  popularEntities: getPopularEntities(state),
  myDataEntitiesFetching: getMyDataEntitiesFetching(state),
  myUpstreamDataEntitiesFetching: getMyUpstreamDataEntitiesFetching(state),
  myDownstreamDataEntitiesFetching: getMyDownstreamDataEntitiesFetching(
    state
  ),
  popularDataEntitiesFetching: getPopularDataEntitiesFetching(state),
});

const mapDispatchToProps = {
  fetchIdentity,
  fetchMyDataEntitiesList,
  fetchMyUpstreamDataEntitiesList,
  fetchMyDownstreamDataEntitiesList,
  fetchPopularDataEntitiesList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Overview));
