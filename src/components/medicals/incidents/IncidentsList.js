import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import { Incident } from "./Incident";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import { AddIncidentDialog } from "./AddIncidentDialog";

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title="Incidents" />
                        <Button variant="contained" onClick={handleClickOpen} sx={{marginBottom: "2em"}}>
                            Add incident
                        </Button>
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
                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            </Box>
            <AddIncidentDialog pet={pet} open={open} setOpen={setOpen} incidentTypes={incidentTypes} syncIncidents={syncIncidents}/>
        </Container>
    );
};
