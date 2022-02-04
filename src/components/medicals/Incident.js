import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import MedicalRepository from "../../repositories/MedicalRepository";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const Incident = ({ incident, syncIncidents, handleChange, expanded, incidentTypes }) => {
    const [editedIncident, setEditedIncident] = useState(incident);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setEditedIncident(incident);
    }, []);

    const starUnstar = () => {
        const copy = { ...editedIncident };
        copy.starred = !editedIncident.starred;
        delete copy.incidentType
        setEditedIncident(copy);
        MedicalRepository.editIncident(copy).then(() =>
            syncIncidents()
        );
    };

    const deleteIncident = () => {
        MedicalRepository.deleteIncident(incident.id).then(() =>
            syncIncidents()
        );
    };

    const editPetIncident = () => {
        const copy = { ...editedIncident };
        delete copy.incidentType
        MedicalRepository.editIncident(copy).then(() =>
            syncIncidents()
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
            <Typography variant="string" color="text.secondary"></Typography>
            <Accordion
                expanded={expanded === `panel${incident.id}`}
                onChange={handleChange(`panel${incident.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${incident.id}-content`}
                    id={`panel${incident.id}-header`}
                >
                    <Typography sx={{ width: "15%", flexShrink: 0 }}>
                        {incident.name}
                    </Typography>
                    <Typography sx={{ width: "33%", flexShrink: 0, color: "text.secondary" }}>
                        {incident.incidentType?.label}
                    </Typography>
                    <IconButton onClick={starUnstar}>
                        {incident.starred ? (
                            <StarIcon />
                        ) : (
                            <StarBorderIcon />
                        )}
                    </IconButton>
                    <IconButton onClick={deleteIncident}>
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                        <p>{incident.date}</p>
                        <p>{incident.description}</p>
                        {/* <p>{incident.petMedicationId ? `${incident.petMedication.name} - ${incident.petMedication.dosage}` : ""}</p> */}
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit incident-type Record</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="name"
                        value={editedIncident.name}
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
                        value={editedIncident.description}
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
                        value={editedIncident.date}
                        required
                        type="date"
                        onChange={(event) => {
                            const copy = { ...editedIncident };
                            copy.date = event.target.value;
                            setEditedIncident(copy);
                        }}
                    />
                   <FormControl required sx={{ m: 1, minWidth: 225 }}>
                        <InputLabel id="shot-label">Incident type</InputLabel>
                        <Select
                            labelId="incident-type-label"
                            id="incident-type"
                            value={editedIncident.incidentTypeId}
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
                    <Button
                        onClick={() => {
                            handleClose();
                            editPetIncident();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
