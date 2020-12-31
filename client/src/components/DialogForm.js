import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText,
          DialogActions, Button } from '@material-ui/core';

export default function DialogForm(props) {
  
  const handleClose = () => {
    props.setOpen(false);
  }

  return (
    <Dialog open={ props.open } onClose={handleClose}>
      <DialogTitle>{ props.title }</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { props.content }
        </DialogContentText>
        { props.form }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleSubmit.handler} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}