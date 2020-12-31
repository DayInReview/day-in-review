import React, { useState, cloneElement } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText,
          DialogActions, Button } from '@material-ui/core';

export default function DialogForm(props) {
  const [submitted, setSubmitted] = useState(false);
  
  const handleClose = () => {
    props.setOpen(false);
    setSubmitted(false);
  }

  return (
    <Dialog open={ props.open } onClose={handleClose}>
      <DialogTitle>{ props.title }</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { props.content }
        </DialogContentText>
        { cloneElement(props.form, { submitted, setSubmitted }) }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {setSubmitted(true)}} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}