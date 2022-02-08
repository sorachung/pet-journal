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

export const EditIncidentDialog = ({
    incident,
    syncIncidents,
    incidentTypes,
    open, setOpen
}) => {
    const [editedIncident, setEditedIncident] = useState(incident);

    useEffect(() => {
        setEditedIncident(incident);
    }, []);

    const editPetIncident = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedIncident };
        delete copy.incidentType;
        delete copy.pet;
        MedicalRepository.editIncident(copy).then(() => syncIncidents());
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editPetIncident}>
                <DialogTitle>Edit Incident Record</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="name"
                        value={editedIncident?.name}
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedIncident };
                            copy.name = event.target.value;
                            setEditedIncident(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="description"
                        value={editedIncident?.description}
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedIncident };
                            copy.description = event.target.value;
                            setEditedIncident(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="date"
                        label="date"
                        value={editedIncident?.date}
                        required
                        type="date"
                        onChange={(event) => {
                            const copy = { ...editedIncident };
                            copy.date = event.target.value;
                            setEditedIncident(copy);
                        }}
                    />
                    <FormControl required sx={{ m: 1, minWidth: 225 }}>
                        <InputLabel id="incident-type-label">Incident type</InputLabel>
                        <Select
                            labelId="incident-type-label"
                            id="incident-type"
                            value={editedIncident?.incidentTypeId}
                            label="incident-type"
                            onChange={(event) => {
                                const copy = { ...editedIncident };
                                copy.incidentTypeId = parseInt(
                                    event.target.value
                                );
                                setEditedIncident(copy);
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
    );
};
