import React, { useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const ViewInvoiceDialog = ({ vetVisit, syncVetVisits, openInv, setOpenInv }) => {
   
    const removeInvoice = () => {
        handleClose();
        const copy = {...vetVisit}
        copy.invoicePicURL = null;
        delete copy.pet;
        delete copy.vet
        MedicalRepository.editVetVisit(copy).then(() => syncVetVisits());
    }


    const handleClose = () => {
        setOpenInv(false);
    };

    return (
        <>
            
            <Dialog open={openInv} onClose={handleClose} maxWidth={false}>
                    <DialogTitle>Inovice</DialogTitle>
                    <DialogContent>
                        <Box sx={{maxWidth:"100%"}}>
                            <img src={vetVisit.invoicePicURL} alt="vet visit invoice" />
                        </Box>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={removeInvoice}>Remove</Button>
                        <Button onClick={handleClose}>Cancel</Button>

                    </DialogActions>
            </Dialog>
        </>
    );
};
