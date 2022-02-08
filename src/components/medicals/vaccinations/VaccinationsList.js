import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Vaccination } from "./Vaccination";
import { AddVaccinationDialog } from "./AddVaccinationDialog";

export const VaccinationsList = ({ pet, dashboardView }) => {
    const [myPetVax, setMyPetVax] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncPetVax = () => {
        MedicalRepository.getPetVaccinationsByPet(pet.id).then((data) => {
            if (dashboardView) {
                data = data.filter((petVax) => petVax.starred);
            }
            setMyPetVax(data);
        });
    };

    useEffect(() => {
        syncPetVax();
        return () => {
            setMyPetVax([]);
        };
    }, [pet]);

    useEffect(() => {
        MedicalRepository.getAllVaccinations().then((data) =>
            setVaccinations(data)
        );
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
                <AddVaccinationDialog vaccinations={vaccinations} pet={pet} syncPetVax={syncPetVax} />
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title="Vaccinations" />
                        
                        {myPetVax.map((petVax) => (
                            <Vaccination
                                key={petVax.id}
                                petVax={petVax}
                                syncPetVax={syncPetVax}
                                handleChange={handleChange}
                                expanded={expanded}
                            />
                        ))}
                    </CardContent>
                </Card>
            </Box>
            
        </Container>
    );
};
