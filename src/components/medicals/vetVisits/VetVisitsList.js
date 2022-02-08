import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import ContactsRepository from "../../../repositories/ContactsRepository";
import { AddVetVisitDialog } from "./AddVetVisitDialog";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { VetVisit } from "./VetVisit";

export const VetVisitsList = ({ pet }) => {
    const [myPetVetVisits, setMyPetVetVisits] = useState([]);
    const [vets, setVets] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncVetVisits = () => {
        MedicalRepository.getAllVetVisitsByPet(pet.id).then((data) => {
            setMyPetVetVisits(data);
        });
    };

    useEffect(() => {
        syncVetVisits();
        ContactsRepository.getVetContacts().then((data) => setVets(data));
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
                <AddVetVisitDialog
                    pet={pet}
                    vets={vets}
                    syncVetVisits={syncVetVisits}
                />
                <Typography variant="h5" gutterBottom align="center">
                    Vet Visits
                </Typography>
                {myPetVetVisits.map((vetVisit) => (
                    <VetVisit
                        key={vetVisit.id}
                        vetVisit={vetVisit}
                        syncVetVisits={syncVetVisits}
                        handleChange={handleChange}
                        expanded={expanded}
                        vets={vets}
                    />
                ))}
            </Box>
        </Container>
    );
};
