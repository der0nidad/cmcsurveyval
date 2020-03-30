import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const ConfirmDialog = ({
  title, children, open, setOpen, onConfirm,
}) => (
  <Dialog
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="confirm-dialog"
  >
    <DialogTitle id="confirm-dialog">{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button
        variant="contained"
        onClick={() => setOpen(false)}
        color="primary"
      >
        No
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(false);
          onConfirm();
        }}
        color="default"
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);
export default ConfirmDialog;
