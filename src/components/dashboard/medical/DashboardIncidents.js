import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import { Incident } from "../../medicals/incidents/Incident";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const DashboardIncidents = ({ myPets }) => {
    const [myPetsIncidents, setMyPetsIncidents] = useState([]);
    const [incidentTypes, setIncidentTypes] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncIncidents = () => {
        const incidentsOfAllPets = [];
        myPets.forEach((pet) => {
            MedicalRepository.getAllIncidentsByPet(pet.id).then((data) => {
                data = data.filter((incident) => incident.starred);
                incidentsOfAllPets.push(...data);
            });
        });
        setMyPetsIncidents(incidentsOfAllPets);
    };

    useEffect(() => {
        syncIncidents();
    }, []);

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
            <Typography variant="h5" gutterBottom align="center">
                Incidents
            </Typography>
            <Box sx={{ textAlign: "center" }}>
                {myPetsIncidents.map((incident) => (
                    <Incident
                        key={incident.id}
                        incident={incident}
                        syncIncidents={syncIncidents}
                        handleChange={handleChange}
                        expanded={expanded}
                        incidentTypes={incidentTypes}
                        dashboardView={true}
                    />
                ))}
            </Box>
        </Container>
    );
};
