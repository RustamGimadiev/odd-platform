import { Theme, createStyles, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(2),
      alignItems: 'center',
    },
    metadataTypeContainer: {
      marginTop: theme.spacing(1.5),
    },
    metadataValueContainer: {
      marginTop: theme.spacing(1.5),
    },
    typeContainer: {
      marginTop: theme.spacing(1.5),
    },
    typeTitle: {
      marginRight: theme.spacing(0.5),
      fontSize: '12px',
      color: '#7A869A',
      fontWeight: 400,
    },
    hidden: {
      display: 'none',
    },
  });

export type StylesType = WithStyles<typeof styles>;
