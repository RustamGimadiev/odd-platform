import { createStyles, Theme, WithStyles } from '@material-ui/core';
import { primaryTabsHeight } from 'components/shared/AppTabs/AppTabsStyles';
import { searchHeight } from 'components/shared/MainSearch/MainSearchStyles';
import { maxContentWidth, toolbarHeight } from 'lib/constants';

const tabsContainerMargin = 16;
export const colWidthStyles = {
  colxs: {
    flex: '2 0 6%',
  },
  colsm: {
    flex: '2 0 7%',
  },
  colmd: {
    flex: '3 0 9%',
  },
  collg: {
    flex: '4 0 12%',
  },
  col: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    paddingRight: '8px',
    paddingLeft: '8px',
    '&:last-of-type': {
      paddingRight: 0,
    },
  },
};
export const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    tabsContainer: {
      marginBottom: `${tabsContainerMargin}px`,
    },
    resultsTable: {},
    resultsTableHeader: {
      color: '#B3BAC5',
      '& > *': {
        borderBottom: '1px solid',
        borderBottomColor: '#EBECF0',
      },
    },
    listContainer: {
      height: `calc(100vh - ${toolbarHeight}px - ${searchHeight}px - ${primaryTabsHeight}px - ${tabsContainerMargin}px - ${theme.spacing(
        5
      )}px)`,
      overflow: 'auto',
    },
    resultItem: {
      '&:not(:last-of-type)': {
        borderBottom: '1px solid',
        borderBottomColor: '#EBECF0',
      },
    },
    spinnerContainer: {
      maxWidth: `${maxContentWidth}px`,
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(1),
    },
    ...colWidthStyles,
  });

export type StylesType = WithStyles<typeof styles>;
