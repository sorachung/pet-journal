import React, { useState, useEffect } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const EditMedicationDialog = ({ open, setOpen, syncPetMedications, myPetMed }) => {
    const [editedMed, setEditedMed] = useState(myPetMed);

    const editPetMed = (event) => {
        event.preventDefault();
        handleClose();
        MedicalRepository.editPetMedication(editedMed).then(() =>
            syncPetMedications()
        );
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editPetMed}>
                <DialogTitle>Edit Medication Record</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="name"
                        value={editedMed.name}
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedMed };
                            copy.name = event.target.value;
                            setEditedMed(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="dosage"
                        label="dosage"
                        value={editedMed.dosage}
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedMed };
                            copy.dosage = event.target.value;
                            setEditedMed(copy);
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={editedMed.isCurrent}
                                onChange={(event) => {
                                    const copy = { ...editedMed };
                                    copy.isCurrent = event.target.checked;
                                    setEditedMed(copy);
                                }}
                            />
                        }
                        label="Is Current?"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
