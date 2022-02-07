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
import { MedicationsList } from "./MedicationsList";
import { VaccinationsList } from "./VaccinationsList";

export const ViewMedical = ({dashboardView}) => {
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
        return () => {
            setDefaultPet({});
        };
    }, [myPets])

    useEffect(() => {
        syncUser();
        return () => {
            syncUser({});
        };
    }, [history.location.state]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                {defaultPet ? defaultPet.name + "'s " : ""} Medical
            </Typography>
            {(defaultPet) ?
                <Grid container spacing={8} direction="column">
                    {dashboardView ? "" : <Grid item xs={12} key={`medicalBio`}>
                        <PetMedicalBio pet={defaultPet} dashboardView={dashboardView} syncPets={syncPets}/>
                    </Grid>}
                    
                    <Grid item xs={12} key={`medications`}>
                        <MedicationsList pet={defaultPet} dashboardView={dashboardView}/>
                    </Grid>
                    <Grid item xs={12} key={`vaccinations`}>
                        <VaccinationsList pet={defaultPet} dashboardView={dashboardView}/>
                    </Grid>
                    <Grid item xs={12} key={`incidentsList`}>
                        <IncidentsList pet={defaultPet} dashboardView={dashboardView}/>
                    </Grid>
                    <Grid item xs={12} key={`vetVisitsList`}>
                        <VetVisitsList pet={defaultPet} dashboardView={dashboardView}/>
                    </Grid>
                </Grid>
            : ""}
        </Container>
    );
};
