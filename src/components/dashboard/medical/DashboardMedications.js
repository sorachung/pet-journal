import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Medication } from "../../medicals/medications/Medication";

export const DashboardMedications = ({ myPets }) => {
    const [myPetsMedications, setMyPetsMedications] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncPetMedications = () => {
        const medsOfAllPets = [];
        myPets.forEach((pet) => {
            MedicalRepository.getMedicationsByPet(pet.id).then((data) => {
                data = data.filter((med) => med.starred);
                medsOfAllPets.push(...data);
            });
        });
        setMyPetsMedications(medsOfAllPets);
    };

    useEffect(() => {
        syncPetMedications();
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" gutterBottom align="center">
                Medications
            </Typography>
            <Box sx={{ textAlign: "center" }}>
                {myPetsMedications.map((myPetMed) => (
                    <Medication
                        key={myPetMed.id}
                        myPetMed={myPetMed}
                        syncPetMedications={syncPetMedications}
                        handleChange={handleChange}
                        expanded={expanded}
                        dashboardView={true}
                    />
                ))}
            </Box>
        </Container>
    );
};
