import React from 'react';
import './Dashboard.scss';
import {
  Grid
} from '@material-ui/core'
import Widget from '../components/Widget'

export default function Dashboard() {
  // Create widgets
  const widgets = [];
  for (let i = 0; i < 6; i++) {
    widgets.push(<Widget name="Small Widget" size="small" widget="todo" />)
  }
  for (let i = 0; i < 4; i++) {
    widgets.push(<Widget name="Medium Widget" size="medium" />)
  }
  for (let i = 0; i < 2; i++) {
    widgets.push(<Widget name="Large Widget" size="large" />)
  }

  return (
    // Row of Widgets
    <Grid container spacing={2}>
      {widgets}
    </Grid>
  );
}
