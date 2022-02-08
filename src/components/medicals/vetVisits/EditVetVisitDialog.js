import React, { useState, useEffect } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const EditVetVisitDialog = ({
    vetVisit,
    syncVetVisits,
    vets,
    open,
    setOpen
}) => {
    const [editedVetVisit, setEditedVetVisit] = useState(vetVisit);

    const editVetVisit = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedVetVisit };
        delete copy.pet;
        delete copy.vet
        MedicalRepository.editVetVisit(copy).then(() => syncVetVisits());
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={editVetVisit}>
                    <DialogTitle>Edit Vet Visit</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="date"
                            label="date"
                            value={editedVetVisit.date}
                            required
                            type="date"
                            onChange={(event) => {
                                const copy = { ...editedVetVisit };
                                copy.date = event.target.value;
                                setEditedVetVisit(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="description"
                            value={editedVetVisit.description}
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...editedVetVisit };
                                copy.description = event.target.value;
                                setEditedVetVisit(copy);
                            }}
                        />
                        <FormControl required sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel id="shot-label">
                                Vet location
                            </InputLabel>
                            <Select
                                labelId="vet-label"
                                id="vet"
                                value={editedVetVisit.vetId}
                                label="vet"
                                onChange={(event) => {
                                    const copy = { ...editedVetVisit };
                                    copy.vetId = parseInt(event.target.value);
                                    setEditedVetVisit(copy);
                                }}
                            >
                                {vets.map((vet) => (
                                    <MenuItem
                                        key={`incident-vet--${vet.id}`}
                                        value={vet.id}
                                    >
                                        {vet.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
    );
};
