import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import { Medication } from "./Medication";
import { AddMedicationDialog } from "./AddMedicationDialog";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const MedicationsList = ({ pet, dashboardView }) => {
    const [myPetMedications, setMyPetMedications] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncPetMedications = () => {
        MedicalRepository.getMedicationsByPet(pet?.id).then((data) => {
            if (dashboardView) {
                data = data.filter((petMed) => petMed.starred);
            }
            setMyPetMedications(data);
        });
    };

    useEffect(() => {
        syncPetMedications();
        return () => {
            setMyPetMedications([]);
        };
    }, [pet]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom align="center">
                    Medications
                </Typography>
                <AddMedicationDialog
                    syncPetMedications={syncPetMedications}
                    pet={pet}
                />
                {myPetMedications.map((myPetMed) => (
                    <Medication
                        key={myPetMed.id}
                        myPetMed={myPetMed}
                        syncPetMedications={syncPetMedications}
                        handleChange={handleChange}
                        expanded={expanded}
                    />
                ))}
            </Box>
        </Container>
    );
};
