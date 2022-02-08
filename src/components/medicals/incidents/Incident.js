import React, { useState, useEffect } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

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
import { EditIncidentDialog } from "./EditIncidentDialog";

export const Incident = ({
    incident,
    syncIncidents,
    handleChange,
    expanded,
    incidentTypes,
    dashboardView
}) => {

    const [open, setOpen] = useState(false);

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...incident };
        copy.starred = !incident.starred;
        delete copy.incidentType;
        delete copy.pet;
        MedicalRepository.editIncident(copy).then(() => syncIncidents());
    };

    const deleteIncident = (event) => {
        event.stopPropagation();
        MedicalRepository.deleteIncident(incident.id).then(() =>
            syncIncidents()
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
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
                    <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {incident.date}
                    </Typography>
                    <Typography sx={{ width: "40%", flexShrink: 0 }}>
                        {incident.name}
                    </Typography>
                    <Typography
                        sx={{
                            width: "20%",
                            flexShrink: 0,
                            color: "text.secondary",
                        }}
                    >
                        {incident.incidentType?.label}
                    </Typography>
                    {dashboardView ? <Typography
                        sx={{
                            width: "10%",
                            flexShrink: 0,
                            color: "text.secondary",
                        }}
                    >
                        {incident.pet.name}
                    </Typography> : ""}
                    <IconButton onClick={starUnstar}>
                        {incident.starred ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton
                        onClick={deleteIncident}
                        sx={{ marginRight: "1em" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <p>{incident.description}</p>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <EditIncidentDialog open={open} setOpen={setOpen} incident={incident} syncIncidents={syncIncidents} incidentTypes={incidentTypes}/>
        </>
    );
};
