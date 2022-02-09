import React, { useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export const ViewInvoiceDialog = ({ vetVisit, syncVetVisits, openInv, setOpenInv }) => {
    const [newVetVisit, setNewVetVisit] = useState({ vetId: "" });
   
    const removeInvoice = () => {
        handleClose();
        const copy = {...vetVisit}
        copy.invoicePicURL = null;
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
                        <img src={vetVisit.invoicePicURL} alt="vet visit invoice" />
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={removeInvoice}>Remove</Button>
                        <Button onClick={handleClose}>Cancel</Button>

                    </DialogActions>
            </Dialog>
        </>
    );
};
