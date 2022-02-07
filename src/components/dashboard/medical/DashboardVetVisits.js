import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import ContactsRepository from "../../../repositories/ContactsRepository";
import { VetVisit } from "../../medicals/VetVisit";

export const DashboardVetVisits = ({ myPets }) => {
    const [myPetsVetVisits, setMyPetsVetVisits] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [vets, setVets] = useState([]);

    const syncVetVisits = () => {
        const vetVisitsOfAllPets = [];
        myPets.forEach((pet) => {
            MedicalRepository.getAllVetVisitsByPet(pet.id).then((data) => {
                data = data.filter((visit) => visit.starred);
                vetVisitsOfAllPets.push(...data);
            });
        });
        setMyPetsVetVisits(vetVisitsOfAllPets);
    };

    useEffect(() => {
        syncVetVisits();
        return () => {
            setMyPetsVetVisits([]);
        };
    }, [myPets]);

    useEffect(() => {
        ContactsRepository.getVetContacts().then((data) => setVets(data));
        syncVetVisits();
        return () => {
            setMyPetsVetVisits([]);
        };
    }, []);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title="Vet Visits" />
                        {myPetsVetVisits.map((vetVisit) => (
                            <VetVisit
                                key={vetVisit.id}
                                vetVisit={vetVisit}
                                syncVetVisits={syncVetVisits}
                                handleChange={handleChange}
                                expanded={expanded}
                                vets={vets}
                                dashboardView={true}
                            />
                        ))}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};
