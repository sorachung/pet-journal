import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import { Incident } from "./Incident";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AddIncidentDialog } from "./AddIncidentDialog";
import Typography from "@mui/material/Typography";

export const IncidentsList = ({ pet }) => {
    const [myPetsIncidents, setMyPetsIncidents] = useState([]);
    const [incidentTypes, setIncidentTypes] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const syncIncidents = () => {
        MedicalRepository.getAllIncidentsByPet(pet?.id).then((data) => {
            setMyPetsIncidents(data);
        });
    };

    useEffect(() => {
        syncIncidents();
        return () => {
            setMyPetsIncidents([]);
        };
    }, [pet]);

    useEffect(() => {
        MedicalRepository.getAllIncidentTypes().then((data) =>
            setIncidentTypes(data)
        );
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom align="center">
                    Incidents
                </Typography>
                <AddIncidentDialog
                    pet={pet}
                    open={open}
                    setOpen={setOpen}
                    incidentTypes={incidentTypes}
                    syncIncidents={syncIncidents}
                />
                {myPetsIncidents.map((incident) => (
                    <Incident
                        key={incident.id}
                        incident={incident}
                        syncIncidents={syncIncidents}
                        handleChange={handleChange}
                        expanded={expanded}
                        incidentTypes={incidentTypes}
                    />
                ))}
            </Box>
        </Container>
    );
};
