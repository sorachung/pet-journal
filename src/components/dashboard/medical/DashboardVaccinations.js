import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Vaccination } from "../../medicals/Vaccination";

export const DashboardVaccinations = ({ myPets }) => {
    const [myPetsVax, setMyPetsVax] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncPetVax = () => {
        const vaxOfAllPets = [];
        myPets.forEach((pet) => {
            MedicalRepository.getPetVaccinationsByPet(pet.id).then((data) => {
                data = data.filter((vax) => vax.starred);
                vaxOfAllPets.push(...data);
            });
        });
        setMyPetsVax(vaxOfAllPets);
    };

    useEffect(() => {
        syncPetVax();
        return () => {
            setMyPetsVax([]);
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
                        <CardHeader title="Vaccinations" />
                        {myPetsVax.map((petVax) => (
                            <Vaccination
                                key={petVax.id}
                                petVax={petVax}
                                syncPetVax={syncPetVax}
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
