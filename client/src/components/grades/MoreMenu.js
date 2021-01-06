import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  icon: {
    paddingRight: theme.spacing(2),
  },
}));

export default function EditMenu(props) {
  const classes = useStyles();

  const handleMenuClose = () => {
    props.setAnchorEl(null);
  }

  return (
    <Menu
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <AddIcon className={classes.icon} />
        Add
      </MenuItem>
      <MenuItem>
        <EditIcon className={classes.icon} />
        Edit
      </MenuItem>
      <MenuItem>
        <DeleteIcon className={classes.icon} />
        Delete
      </MenuItem>
    </Menu>
  );
}