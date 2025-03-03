import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <Typography>
          Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Annuler</Button>
        <Button variant="contained" color="error" onClick={handleConfirm}>Supprimer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
