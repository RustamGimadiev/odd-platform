import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const MinusIcon: React.FC<SvgIconProps> = props => (
  <SvgIcon viewBox="0 0 6 2" {...props}>
    <path
      d="M0 1C0 0.447715 0.447715 0 1 0H5C5.55228 0 6 0.447715 6 1C6 1.55228 5.55228 2 5 2H1C0.447715 2 0 1.55228 0 1Z"
      fill="white"
    />
  </SvgIcon>
);

export default MinusIcon;
