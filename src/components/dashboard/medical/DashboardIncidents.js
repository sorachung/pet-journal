import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import { Incident } from "../../medicals/Incident";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

export const DashboardIncidents = ({ myPets }) => {
    const [myPetsIncidents, setMyPetsIncidents] = useState([]);
    const [incidentTypes, setIncidentTypes] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

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
        return () => {
            setMyPetsIncidents([]);
        };
    }, [myPets]);

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
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title="Incidents" />
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
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};
