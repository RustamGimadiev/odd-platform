import { Typography, Grid } from '@material-ui/core';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import cx from 'classnames';
import {
  dataEntityOverviewPath,
  datasetStructurePath,
  dataEntityLineagePath,
} from 'lib/paths';
import {
  DataEntityDetails,
  DataEntityTypeNameEnum,
  DataEntityApiGetDataEntityDetailsRequest,
} from 'generated-sources';
import AppTabs, { AppTabItem } from 'components/shared/AppTabs/AppTabs';
import TimeGapIcon from 'components/shared/Icons/TimeGapIcon';
import InternalNameFormDialogContainer from 'components/DataEntityDetails/InternalNameFormDialog/InternalNameFormDialogContainer';
import AppButton from 'components/shared/AppButton/AppButton';
import AddIcon from 'components/shared/Icons/AddIcon';
import EditIcon from 'components/shared/Icons/EditIcon';
import EntityTypeItem from 'components/shared/EntityTypeItem/EntityTypeItem';
import OverviewContainer from './Overview/OverviewContainer';
import DatasetStructureContainer from './DatasetStructure/DatasetStructureContainer';
import LineageContainer from './Lineage/LineageContainer';
import { StylesType } from './DataEntityDetailsStyles';

interface DataEntityDetailsProps extends StylesType {
  viewType: string;
  dataEntityId: number;
  dataEntityDetails: DataEntityDetails;
  fetchDataEntityDetails: (
    params: DataEntityApiGetDataEntityDetailsRequest
  ) => void;
}

const DataEntityDetailsView: React.FC<DataEntityDetailsProps> = ({
  classes,
  viewType,
  dataEntityId,
  dataEntityDetails,
  fetchDataEntityDetails,
}) => {
  const [tabs, setTabs] = React.useState<AppTabItem[]>([
    { name: 'Overview', link: dataEntityOverviewPath(dataEntityId) },
    {
      name: 'Structure',
      link: datasetStructurePath(dataEntityId),
      hidden: true,
    },
    { name: 'Lineage', link: dataEntityLineagePath(dataEntityId) },
  ]);

  const [selectedTab, setSelectedTab] = React.useState<number>(-1);

  React.useEffect(() => {
    fetchDataEntityDetails({ dataEntityId });
  }, [fetchDataEntityDetails, dataEntityId]);

  React.useEffect(() => {
    setTabs(
      tabs.map(tab => ({
        ...tab,
        hidden:
          tab.name === 'Structure' &&
          (!dataEntityDetails ||
            !dataEntityDetails?.types.find(
              type => type.name === DataEntityTypeNameEnum.SET
            )),
      }))
    );
  }, [dataEntityDetails]);

  React.useEffect(() => {
    setSelectedTab(
      viewType
        ? tabs.findIndex(tab => tab.name.toLowerCase() === viewType)
        : 0
    );
  }, [tabs]);

  return (
    <div className={classes.container}>
      {dataEntityDetails ? (
        <>
          <Grid container justify="space-between" alignItems="center">
            <Grid item className={classes.caption}>
              <Grid container item alignItems="center">
                <Typography variant="h1" noWrap>
                  {dataEntityDetails.internalName
                    ? dataEntityDetails.internalName
                    : dataEntityDetails.externalName}
                </Typography>
                {dataEntityDetails.types.map(type => (
                  <EntityTypeItem
                    key={type.id}
                    typeName={type.name}
                    className={classes.entityTypeLabel}
                  />
                ))}
                <div className={cx(classes.internalNameEditBtnContainer)}>
                  <InternalNameFormDialogContainer
                    dataEntityId={dataEntityId}
                    btnCreateEl={
                      <AppButton
                        className={classes.internalNameEditBtn}
                        onClick={() => {}}
                        size="medium"
                        color="tertiary"
                        icon={
                          dataEntityDetails.internalName ? (
                            <EditIcon />
                          ) : (
                            <AddIcon />
                          )
                        }
                      >
                        {`${
                          dataEntityDetails.internalName
                            ? 'Edit'
                            : 'Add custom'
                        } name`}
                      </AppButton>
                    }
                  />
                </div>
              </Grid>
              {dataEntityDetails.internalName && (
                <Grid container alignItems="center">
                  <div className={classes.originalLabel}>Original</div>
                  <Typography variant="body1" noWrap>
                    {dataEntityDetails.externalName}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item className={classes.updatedAt}>
              {dataEntityDetails.updatedAt ? (
                <>
                  <TimeGapIcon classes={{ root: classes.updatedAtIcon }} />
                  <Typography variant="body1">
                    {formatDistanceToNowStrict(
                      dataEntityDetails.updatedAt,
                      {
                        addSuffix: true,
                      }
                    )}
                  </Typography>
                </>
              ) : null}
            </Grid>
          </Grid>
          {tabs.length && selectedTab >= 0 ? (
            <AppTabs
              className={classes.tabsContainer}
              variant="primary"
              items={tabs}
              selectedTab={selectedTab}
              handleTabChange={() => {}}
            />
          ) : null}
          <Switch>
            <Route
              exact
              path="/dataentities/:dataEntityId/overview"
              component={OverviewContainer}
            />
            <Route
              exact
              path="/dataentities/:dataEntityId/structure/:versionId?"
              component={DatasetStructureContainer}
            />
            <Route
              exact
              path="/dataentities/:dataEntityId/lineage"
              component={LineageContainer}
            />
            <Redirect
              from="/dataentities/:dataEntityId"
              to="/dataentities/:dataEntityId/overview"
            />
          </Switch>
        </>
      ) : null}
    </div>
  );
};

export default DataEntityDetailsView;
