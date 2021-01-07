import React from 'react';
import {
  Grid
} from '@material-ui/core'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import Widget from '../components/Widget'


export default function Dashboard() {
  const descriptions = {
    "todo": "A simple to-do list",
    "email": "AI-powered email summaries delivered straight to your inbox",
    "summarizer": "Get summaries of all sorts of documents",
    "grades": "Track your course assignments, grades, and GPA",
  }

  // Create widgets
  const widgets = [];

  widgets.push(<Widget name="To-do" description={descriptions.todo} widget="todo" icon={<ListAltOutlinedIcon style={{ fontSize: '20vmin', color: '#009688' }}/>} />);
  widgets.push(<Widget name="Email" description={descriptions.email} widget="email" icon={<EmailOutlinedIcon style={{ fontSize: '20vmin', color: '#01579b' }}/>} />);
  widgets.push(<Widget name="Summarizer" description={descriptions.summarizer} widget="summarizer" icon={<DescriptionOutlinedIcon style={{ fontSize: '20vmin', color: '#8e24aa' }}/>} />);
  widgets.push(<Widget name="Grades" description={descriptions.grades} widget="grades" icon={<SchoolOutlinedIcon style={{ fontSize: '20vmin', color: '#ef5350' }}/>} />);
  widgets.push(<Widget name="To-do" description={descriptions.todo} widget="todo" icon={<ListAltOutlinedIcon style={{ fontSize: '20vmin', color: '#009688' }}/>} />);
  widgets.push(<Widget name="To-do" description={descriptions.todo} widget="todo" icon={<ListAltOutlinedIcon style={{ fontSize: '20vmin', color: '#009688' }}/>} />);

  return (
    // Row of Widgets
    <Grid container spacing={2}>
      {widgets}
    </Grid>
  );
}
