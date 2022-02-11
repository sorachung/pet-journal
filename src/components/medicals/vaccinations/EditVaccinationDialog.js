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

export const EditVaccinationDialog = ({
    petVax,
    open,
    setOpen,
    syncPetVax,
    vaccinations,
}) => {
    const [editedPetVax, setEditedPetVax] = useState(petVax);

    const editPetVax = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedPetVax };
        delete copy.vaccination;
        delete copy.pet;
        MedicalRepository.editPetVaccination(copy).then(() => syncPetVax());
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editPetVax}>
                <DialogTitle>Edit Vaccination Record</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="date"
                        label="date"
                        value={editedPetVax?.date}
                        required
                        type="date"
                        onChange={(event) => {
                            const copy = { ...editedPetVax };
                            copy.date = event.target.value;
                            setEditedPetVax(copy);
                        }}
                    />

                    <FormControl required sx={{ m: 1, minWidth: 225 }}>
                        <InputLabel id="vaccination-label">
                            Vaccination
                        </InputLabel>
                        <Select
                            labelId="Vaccination-label"
                            id="Vaccination"
                            value={editedPetVax?.vaccinationId}
                            label="Vaccination"
                            onChange={(event) => {
                                const copy = { ...editedPetVax };
                                copy.vaccinationId = parseInt(
                                    event.target.value
                                );
                                setEditedPetVax(copy);
                            }}
                        >
                            {vaccinations?.map((vax) => (
                                <MenuItem
                                    key={`vaccination--${vax.id}`}
                                    value={vax.id}
                                >
                                    {vax.shot}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="details"
                        label="details"
                        type="details"
                        value={editedPetVax?.details}
                        multiline
                        onChange={(event) => {
                            const copy = { ...editedPetVax };
                            copy.details = event.target.value;
                            setEditedPetVax(copy);
                        }}
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
