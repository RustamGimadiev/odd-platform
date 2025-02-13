import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import MainSearchContainer from 'components/shared/MainSearch/MainSearchContainer';
import cx from 'classnames';
import {
  DataEntityRef,
  DataEntityApiGetMyObjectsRequest,
  DataEntityApiGetMyObjectsWithUpstreamRequest,
  DataEntityApiGetMyObjectsWithDownstreamRequest,
  DataEntityApiGetPopularRequest,
  AssociatedOwner,
} from 'generated-sources';
import AlertIcon from 'components/shared/Icons/AlertIcon';
import AppButton from 'components/shared/AppButton/AppButton';
import UpstreamIcon from 'components/shared/Icons/UpstreamIcon';
import DownstreamIcon from 'components/shared/Icons/DownstreamIcon';
import StarIcon from 'components/shared/Icons/StarIcon';
import CatalogIcon from 'components/shared/Icons/CatalogIcon';
import { StylesType } from './OverviewStyles';
import OverviewDataEntityContainer from './DataEntityList/DataEntityListContainer';
import TopTagsListContainer from './TopTagsList/TopTagsListContainer';
import IdentityContainer from './IdentityForm/IdentityContainer';

interface OverviewProps extends StylesType {
  identity?: AssociatedOwner;
  identityFetched: boolean;
  myEntities: DataEntityRef[];
  myEntitiesDownstream: DataEntityRef[];
  myEntitiesUpstream: DataEntityRef[];
  popularEntities: DataEntityRef[];
  myDataEntitiesFetching: boolean;
  myUpstreamDataEntitiesFetching: boolean;
  myDownstreamDataEntitiesFetching: boolean;
  popularDataEntitiesFetching: boolean;
  fetchMyDataEntitiesList: (
    params: DataEntityApiGetMyObjectsRequest
  ) => Promise<DataEntityRef[]>;
  fetchMyUpstreamDataEntitiesList: (
    params: DataEntityApiGetMyObjectsWithUpstreamRequest
  ) => Promise<DataEntityRef[]>;
  fetchMyDownstreamDataEntitiesList: (
    params: DataEntityApiGetMyObjectsWithDownstreamRequest
  ) => Promise<DataEntityRef[]>;
  fetchPopularDataEntitiesList: (
    params: DataEntityApiGetPopularRequest
  ) => Promise<DataEntityRef[]>;
}

const Overview: React.FC<OverviewProps> = ({
  classes,
  identity,
  identityFetched,
  myEntities,
  myEntitiesDownstream,
  myEntitiesUpstream,
  popularEntities,
  myDataEntitiesFetching,
  myUpstreamDataEntitiesFetching,
  myDownstreamDataEntitiesFetching,
  popularDataEntitiesFetching,
  fetchMyDataEntitiesList,
  fetchMyUpstreamDataEntitiesList,
  fetchMyDownstreamDataEntitiesList,
  fetchPopularDataEntitiesList,
}) => {
  React.useEffect(() => {
    if (!identity) return;
    const params = {
      page: 1,
      size: 5,
    };
    fetchMyDataEntitiesList(params);
    fetchMyUpstreamDataEntitiesList(params);
    fetchMyDownstreamDataEntitiesList(params);
    fetchPopularDataEntitiesList(params);
  }, [identity]);

  return (
    <div className={classes.container}>
      <Grid
        container
        alignItems="center"
        className={classes.searchContainer}
      >
        <MainSearchContainer />
      </Grid>
      <Grid container className={classes.tagsContainer}>
        <TopTagsListContainer />
      </Grid>
      <Grid container className={classes.infoBarContainer} wrap="nowrap">
        <Grid
          item
          xs={3}
          className={cx(classes.infoBarItem, classes.alertsContainer)}
        >
          <Grid container justify="space-between">
            <Typography variant="subtitle1">Alerts</Typography>
            <AppButton
              size="small"
              color="dropdown"
              onClick={() => {}}
              className={classes.showAllAlerts}
            >
              See All
            </AppButton>
          </Grid>
          <Grid container className={classes.alerts}>
            <Grid container className={classes.myAlerts}>
              <AlertIcon className={classes.alertIcon} />
              <Typography variant="h2" className={classes.alertsCount}>
                2
              </Typography>
              <span className={classes.infoBarStatsText}>my</span>
            </Grid>
            <Grid container className={classes.dependAlerts}>
              <Typography variant="h2" className={classes.alertsCount}>
                2
              </Typography>
              <span className={classes.infoBarStatsText}>dependent</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.infoBarItem}>
          <Typography variant="subtitle1">Overall quality</Typography>
          <Typography variant="h2">98%</Typography>
        </Grid>
        <Grid item xs={3} className={classes.infoBarItem}>
          <Typography variant="subtitle1">Downtime</Typography>
          <Typography variant="h2">2</Typography>
        </Grid>
        <Grid item xs={3} className={classes.infoBarItem}>
          <Typography variant="subtitle1">SLA</Typography>
          <Grid container wrap="nowrap" alignItems="center">
            <Typography variant="h2">98</Typography>
            <Typography
              variant="h2"
              color="textSecondary"
              className={classes.slaTargetValue}
            >
              /100
            </Typography>
            <span className={classes.infoBarStatsText}>target</span>
          </Grid>
        </Grid>
      </Grid>
      {identity?.owner ? (
        <Grid container spacing={2} className={classes.dataContainer}>
          <Grid item xs={3}>
            <OverviewDataEntityContainer
              dataEntitiesList={myEntities}
              entityListName="My Objects"
              entityListIcon={<CatalogIcon />}
              isFetching={myDataEntitiesFetching}
            />
          </Grid>
          <Grid item xs={3}>
            <OverviewDataEntityContainer
              dataEntitiesList={myEntitiesUpstream}
              entityListName="Upstream dependents"
              entityListIcon={<UpstreamIcon />}
              isFetching={myUpstreamDataEntitiesFetching}
            />
          </Grid>
          <Grid item xs={3}>
            <OverviewDataEntityContainer
              dataEntitiesList={myEntitiesDownstream}
              entityListName="Downstream dependents"
              entityListIcon={<DownstreamIcon />}
              isFetching={myDownstreamDataEntitiesFetching}
            />
          </Grid>
          <Grid item xs={3}>
            <OverviewDataEntityContainer
              dataEntitiesList={popularEntities}
              entityListName="Popular"
              entityListIcon={<StarIcon />}
              isFetching={popularDataEntitiesFetching}
            />
          </Grid>
        </Grid>
      ) : null}
      {!identity?.owner && identityFetched ? <IdentityContainer /> : null}
    </div>
  );
};

export default Overview;
