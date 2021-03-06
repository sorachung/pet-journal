import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import ContactsRepository from "../../../repositories/ContactsRepository";
import { VetVisit } from "../../medicals/vetVisits/VetVisit";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const DashboardVetVisits = ({ myPets }) => {
    const [myPetsVetVisits, setMyPetsVetVisits] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [vets, setVets] = useState([]);

    const syncVetVisits = () => {
        const vetVisitsOfAllPets = [];
        const promisesArray = [];
        myPets.forEach((pet) => {
            promisesArray.push(MedicalRepository.getAllVetVisitsByPet(pet.id));
        });

        Promise.all(promisesArray).then((dataArr) => {
            dataArr.forEach((data) => {
                data = data.filter((visit) => visit.starred);
                vetVisitsOfAllPets.push(...data);
            });
            setMyPetsVetVisits(vetVisitsOfAllPets);
        });
    };

    useEffect(() => {
        ContactsRepository.getVetContacts().then((data) => setVets(data));
        syncVetVisits();
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" gutterBottom align="center">
                Vet Visits
            </Typography>
            <Box >
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
            </Box>
        </Container>
    );
};
