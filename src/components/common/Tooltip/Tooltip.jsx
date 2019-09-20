import React from 'react';
import { Tooltip as MaterialTooltip } from '@material-ui/core';
import { useStyles } from './';
const Tooltip = props => {
  const { children, name } = props;
  return (
    <div>
      <MaterialTooltip title="Please use a mix of numbers and letters. Must include at least one capital letter">
        <h1 aria-label="Delete">Hey</h1>
      </MaterialTooltip>
    </div>
  );
};

export default Tooltip;
