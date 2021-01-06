import React, { useState, cloneElement } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText,
          DialogActions, Button } from '@material-ui/core';

const titles = {
  add: 'Add New Item',
  edit: 'Update Item',
  delete: 'Delete Item',
}

const submit = {
  add: 'Add',
  edit: 'Update',
  delete: 'Delete',
}

export default function DialogForm(props) {
  const [submitted, setSubmitted] = useState(false);
  
  const handleClose = () => {
    props.setOpen(false);
    setSubmitted(false);
    props.setAnchorEl(null);
  }

  const handleSubmit = () => {
    setSubmitted(true);
    props.setOpen(false);
    props.setAnchorEl(null);
  }

  return (
    <Dialog open={ props.open } onClose={handleClose}>
      <DialogTitle>{ titles[props.actionType] }</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { props.content }
        </DialogContentText>
        { props.form ? cloneElement(props.form, { submitted, setSubmitted }) : null }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color={props.actionType === 'delete' ? "secondary" : "primary"}>
          { submit[props.actionType] }
        </Button>
      </DialogActions>
    </Dialog>
  );
}