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

export const AddIncidentDialog = ({
    pet,
    open,
    setOpen,
    syncIncidents,
    incidentTypes,
}) => {
    const [newPetIncident, setNewPetIncident] = useState({
        incidentTypeId: "",
    });

    const addPetIncident = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...newPetIncident };
        copy.petId = pet.id;
        copy.starred = false;
        MedicalRepository.addIncident(copy).then(() => syncIncidents());
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Typography align="center">
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ marginBottom: "2em" }}
                >
                    Add incident
                </Button>
            </Typography>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={addPetIncident}>
                    <DialogTitle>Add Incident Record</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="name"
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...newPetIncident };
                                copy.name = event.target.value;
                                setNewPetIncident(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="description"
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...newPetIncident };
                                copy.description = event.target.value;
                                setNewPetIncident(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="date"
                            label="date"
                            InputLabelProps={{ shrink: true }}
                            required
                            type="date"
                            onChange={(event) => {
                                const copy = { ...newPetIncident };
                                copy.date = event.target.value;
                                setNewPetIncident(copy);
                            }}
                        />
                        <FormControl required sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel id="incident-type">
                                Incident type
                            </InputLabel>
                            <Select
                                labelId="incident-type-label"
                                id="incident-type"
                                value={newPetIncident.incidentTypeId}
                                label="incident-type"
                                onChange={(event) => {
                                    const copy = { ...newPetIncident };
                                    copy.incidentTypeId = parseInt(
                                        event.target.value
                                    );
                                    setNewPetIncident(copy);
                                }}
                            >
                                {incidentTypes.map((type) => (
                                    <MenuItem
                                        key={`incident-type--${type.id}`}
                                        value={type.id}
                                    >
                                        {type.label}
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
