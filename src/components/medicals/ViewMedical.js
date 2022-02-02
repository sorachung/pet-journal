import React, { useEffect, useState } from "react";
import PetRepository from "../../repositories/PetRepository";
import UserRepository from "../../repositories/UserRepository";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { useHistory } from "react-router-dom";
import { PetMedicalBio } from "./PetMedicalBio";
import { IncidentsList } from "./IncidentsList";
import { VetVisitsList } from "./VetVisitsList";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const ViewMedical = () => {
    const [user, updateUser] = useState({});
    const [myPets, setMyPets] = useState([]);
    const [defaultPet, setDefaultPet] = useState({})
    const { getCurrentUser } = useSimpleAuth();
    const history = useHistory();
    

    const syncPets = () => {
        PetRepository.getAllExpandAllByUser(getCurrentUser().id).then(
            (data) => {
                data.sort((el1) => {
                    if (el1.id === user.defaultPetId) {
                        return -1;
                    }
                });
                setMyPets(data);
            }
        );
    };

    const syncUser = () => {
        UserRepository.get(getCurrentUser().id).then((data) => {
            updateUser(data);
        });
    };

    useEffect(() => {
        syncUser();
    }, []);

    useEffect(() => {
        syncPets();
    }, [user]);

    useEffect(() => {
        setDefaultPet(myPets.find(pet => user.defaultPetId === pet.id))
    }, [myPets])

    useEffect(() => {
        syncUser();
    }, [history.location.state]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                {defaultPet?.name}'s Medical
            </Typography>

            <Grid container spacing={4} direction="column">
                <Grid item xs={4} key={`medicalBio`}>
                    <PetMedicalBio pet={defaultPet}/>
                </Grid>
                <Grid item xs={4} key={`incidentsList`}>
                    <IncidentsList pet={defaultPet}/>
                </Grid>
                <Grid item xs={4} key={`vetVisitsList`}>
                    <VetVisitsList pet={defaultPet}/>
                </Grid>
            </Grid>
        </Container>
    );
};
