import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import { Vaccination } from "../../medicals/vaccinations/Vaccination";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const DashboardVaccinations = ({ myPets }) => {
    const [myPetsVax, setMyPetsVax] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncPetVax = () => {
        const vaxOfAllPets = [];
        const promisesArray = [];
        myPets.forEach((pet) => {
            promisesArray.push(
                MedicalRepository.getPetVaccinationsByPet(pet.id)
            );
        });
        Promise.all(promisesArray).then((dataArr) => {
            dataArr.forEach((data) => {
                data = data.filter((vax) => vax.starred);
                vaxOfAllPets.push(...data);
            });
            setMyPetsVax(vaxOfAllPets);
        });
    };

    useEffect(() => {
        syncPetVax();
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" gutterBottom align="center">
                Vaccinations
            </Typography>
            <Box >
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
            </Box>
        </Container>
    );
};
