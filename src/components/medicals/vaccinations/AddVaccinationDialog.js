import React, { useState } from "react";
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
import Typography from "@mui/material/Typography";

export const AddVaccinationDialog = ({ pet, vaccinations, syncPetVax }) => {
    const [newPetVax, setNewPetVax] = useState({ vaccinationId: "" });
    const [open, setOpen] = useState(false);

    const addPetVax = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...newPetVax };
        copy.petId = pet.id;
        copy.starred = false;
        MedicalRepository.addPetVaccination(copy).then((data) =>
            syncPetVax(data)
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
                    Add vaccination
                </Button>
            </Typography>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={addPetVax}>
                    <DialogTitle>Add Vaccination Record</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="date"
                            label="date"
                            required
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            onChange={(event) => {
                                const copy = { ...newPetVax };
                                copy.date = event.target.value;
                                setNewPetVax(copy);
                            }}
                        />

                        <FormControl required sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel id="shot-label">Vaccination</InputLabel>
                            <Select
                                labelId="Vaccination-label"
                                id="Vaccination"
                                value={newPetVax.vaccinationId}
                                label="vaccination"
                                onChange={(event) => {
                                    const copy = { ...newPetVax };
                                    copy.vaccinationId = parseInt(
                                        event.target.value
                                    );
                                    setNewPetVax(copy);
                                }}
                            >
                                {vaccinations.map((vax) => (
                                    <MenuItem
                                        key={`vaccination--${vax.id}`}
                                        value={vax.id}
                                    >
                                        {vax.shot}
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
