import { createStyles, Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    statsItem: {
      display: 'flex',
      alignItems: 'center',
    },
    statIcon: {
      fontSize: theme.typography.h5.fontSize,
      marginRight: theme.spacing(1),
    },
    statLabel: {
      color: '#B3BAC5',
      textTransform: 'uppercase',
    },
    statValue: {},
    typeLabel: {
      marginLeft: 0,
      marginBottom: theme.spacing(1.25),
    },
  });

export type StylesType = WithStyles<typeof styles>;
