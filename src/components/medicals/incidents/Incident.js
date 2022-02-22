import React, { useState, useEffect } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
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
    dashboardView,
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
                sx={{ backgroundColor: "white" }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${incident.id}-content`}
                    id={`panel${incident.id}-header`}
                    sx={{
                        ".MuiAccordionSummary-content": {
                            justifyContent: "space-between",
                        },
                    }}
                >
                    <Typography sx={{ flexBasis: "20%", flexShrink: 0 }}>
                        {incident.date}
                    </Typography>
                    <Typography sx={{ flexBasis: "20%", flexShrink: 1 }}>
                        {incident.name}
                    </Typography>
                    <Typography
                        sx={{
                            flexBasis: "20%",
                            flexShrink: 1,
                            color: "text.secondary",
                        }}
                    >
                        {incident.incidentType?.label}
                    </Typography>
                    {dashboardView ? (
                        <Typography
                            sx={{
                                flexBasis: "10%",
                                flexShrink: 0,
                                color: "text.secondary",
                            }}
                        >
                            {incident.pet.name}
                        </Typography>
                    ) : (
                        ""
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "no-wrap",
                            flexBasis: "10%",
                        }}
                    >
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
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <p>{incident.description}</p>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <EditIncidentDialog
                open={open}
                setOpen={setOpen}
                incident={incident}
                syncIncidents={syncIncidents}
                incidentTypes={incidentTypes}
            />
        </>
    );
};
