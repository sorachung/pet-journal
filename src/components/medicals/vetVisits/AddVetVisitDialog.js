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
import Typography from "@mui/material/Typography";

export const AddVetVisitDialog = ({ pet, vets, syncVetVisits }) => {
    const [newVetVisit, setNewVetVisit] = useState({ vetId: "" });
    const [open, setOpen] = useState(false);

    const addVetVisit = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...newVetVisit };
        copy.petId = pet.id;
        copy.starred = false;
        copy.invoicePicURL = null;
        MedicalRepository.addVetVisit(copy).then(() => syncVetVisits());
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
                    Add vet visit
                </Button>
            </Typography>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={addVetVisit}>
                    <DialogTitle>Add Vet Visit</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="date"
                            label="date"
                            InputLabelProps={{ shrink: true }}
                            required
                            type="date"
                            onChange={(event) => {
                                const copy = { ...newVetVisit };
                                copy.date = event.target.value;
                                setNewVetVisit(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="description"
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...newVetVisit };
                                copy.description = event.target.value;
                                setNewVetVisit(copy);
                            }}
                        />
                        <FormControl required sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel id="vet">Vet location</InputLabel>
                            <Select
                                labelId="vet-label"
                                id="vet"
                                value={newVetVisit.vetId}
                                label="vet"
                                onChange={(event) => {
                                    const copy = { ...newVetVisit };
                                    copy.vetId = parseInt(event.target.value);
                                    setNewVetVisit(copy);
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
        </>
    );
};
