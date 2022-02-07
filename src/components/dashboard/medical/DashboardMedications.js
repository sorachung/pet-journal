import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Medication } from "../../medicals/Medication";

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
        return () => {
            setMyPetsMedications([]);
        };
    }, [myPets]);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title="Medications" />
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
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};
