import React, { useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export const AddMedicationDialog = ({ pet, syncPetMedications }) => {
    const [newPetMed, setNewPetMed] = useState({ isCurrent: false });
    const [open, setOpen] = useState(false);

    const addPetMed = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...newPetMed };
        copy.starred = false;
        copy.petId = pet.id;
        MedicalRepository.addPetMedication(copy).then(() =>
            syncPetMedications()
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Typography align="center">
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ marginBottom: "2em" }}
                >
                    Add med
                </Button>
            </Typography>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={addPetMed}>
                    <DialogTitle>Add Medication Record</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="name"
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...newPetMed };
                                copy.name = event.target.value;
                                setNewPetMed(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="dosage"
                            label="dosage"
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...newPetMed };
                                copy.dosage = event.target.value;
                                setNewPetMed(copy);
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(event) => {
                                        const copy = { ...newPetMed };
                                        copy.isCurrent = event.target.checked;
                                        setNewPetMed(copy);
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
        </>
    );
};
