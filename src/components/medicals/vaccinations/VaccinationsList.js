import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Vaccination } from "./Vaccination";
import { AddVaccinationDialog } from "./AddVaccinationDialog";

export const VaccinationsList = ({ pet }) => {
    const [myPetVax, setMyPetVax] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncPetVax = () => {
        MedicalRepository.getPetVaccinationsByPet(pet?.id).then((data) => {
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
            <Typography variant="h5" gutterBottom align="center">
                Vaccinations
            </Typography>
            <AddVaccinationDialog
                vaccinations={vaccinations}
                pet={pet}
                syncPetVax={syncPetVax}
            />
            <Box>
                {myPetVax.map((petVax) => (
                    <Vaccination
                        key={petVax.id}
                        petVax={petVax}
                        syncPetVax={syncPetVax}
                        handleChange={handleChange}
                        expanded={expanded}
                    />
                ))}
            </Box>
        </Container>
    );
};
