import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './style.scss';

export const DecisionPopup = ({
    modalVisibility,
    dialogContent,
    dialogTitle,
    confirmButtonTitle = 'Confirm',
    rejectButtonTitle = 'Cancel',
    toggleDialogModal = () => { },
    onConfirmation = () => { },
    onRejection = () => { },
}) => {
    return (
        <div>
            <Dialog
                open={modalVisibility}
                onClose={toggleDialogModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    {!!confirmButtonTitle && <Button onClick={onConfirmation} color="primary" >
                        {confirmButtonTitle}
                    </Button>}
                    <Button onClick={onRejection} className={'button-outline'} color="primary">
                        {rejectButtonTitle}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

