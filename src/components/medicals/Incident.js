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
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const Incident = ({ incident, syncIncidents, handleChange, expanded }) => {
    const [editedIncident, setEditedIncident] = useState({});
    const { getCurrentUser } = useSimpleAuth();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setEditedIncident({});
    }, [incident]);

    const starUnstar = () => {
        const copy = { ...editedIncident };
        copy.starred = !editedIncident.starred;
        setEditedIncident(copy);
        MedicalRepository.editIncident(copy);
    };

    const deleteIncident = () => {
        MedicalRepository.deleteIncident(incident.id).then(() =>
            syncIncidents()
        );
    };

    const editIncident = () => {
        MedicalRepository.editIncident(editedIncident).then(() =>
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
                        {editedIncident.starred ? (
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
                    <Typography>
                        <p>{incident.date}</p>
                        <p>{incident.description}</p>
                        <p>{incident.petMedicationId ? `${incident.petMedication.name} - ${incident.petMedication.dosage}` : ""}</p>
                    </Typography>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
        </>
    );
};
