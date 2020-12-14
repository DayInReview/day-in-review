import React from 'react';
import './Dashboard.scss';
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

  widgets.push(<Widget name="To-do" description={descriptions.todo} widget="todo" icon={<ListAltOutlinedIcon style={{ fontSize: 180, color: 'green' }}/>} />);
  widgets.push(<Widget name="Email" description={descriptions.email} widget="email" icon={<EmailOutlinedIcon style={{ fontSize: 180, color: 'blue' }}/>} />);
  widgets.push(<Widget name="Summarizer" description={descriptions.summarizer} widget="summarizer" icon={<DescriptionOutlinedIcon style={{ fontSize: 180, color: 'red' }}/>} />);
  widgets.push(<Widget name="Grades" description={descriptions.grades} widget="grades" icon={<SchoolOutlinedIcon style={{ fontSize: 180, color: 'orange' }}/>} />);
  widgets.push(<Widget name="To-do" description={descriptions.todo} widget="todo" icon={<ListAltOutlinedIcon style={{ fontSize: 180, color: 'green' }}/>} />);
  widgets.push(<Widget name="To-do" description={descriptions.todo} widget="todo" icon={<ListAltOutlinedIcon style={{ fontSize: 180, color: 'green' }}/>} />);

  return (
    // Row of Widgets
    <Grid container spacing={2}>
      {widgets}
    </Grid>
  );
}
