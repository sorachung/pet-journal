import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Pet } from "../pets/Pet";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import UserRepository from "../../repositories/UserRepository";
import PetRepository from "../../repositories/PetRepository";
import { useHistory } from "react-router-dom";
import { DashboardIncidents } from "./medical/DashboardIncidents";
import { DashboardMedications } from "./medical/DashboardMedications";
import { DashboardVaccinations } from "./medical/DashboardVaccinations";
import { DashboardVetVisits } from "./medical/DashboardVetVisits";
import { DashboardNotes } from "./notes/DashboardNotes";
import { DashboardContacts } from "./contacts/DashboardContacts";
import { PetAddDialog } from "../pets/PetAddDialog";

export const Dashboard = () => {
    const [user, setUser] = useState();
    const [myPets, setMyPets] = useState([]);
    const { getCurrentUser } = useSimpleAuth();
    const history = useHistory();

    const syncPets = () => {
        PetRepository.findPetsByUser(getCurrentUser().id).then((data) =>
            setMyPets(data)
        );
    };

    const syncUser = () => {
        UserRepository.get(getCurrentUser().id).then((data) => setUser(data));
    };

    useEffect(() => {
        syncUser();
        syncPets();
    }, []);

    // set defaultPetId for user if user adds a first pet
    useEffect(() => {
        if(myPets.length > 0 && user.defaultPetId === 0) {
            const copy = {...user};
            copy.defaultPetId = myPets[0].id
            setUser(copy);
            UserRepository.get(getCurrentUser().id).then((data) => {
                setUser(data);
                history.push(history.location.pathname, data);
            });
        }
    },[myPets])
    
    useEffect(() => {
        syncUser();
    }, [history.location.state]);

    return (
        <Container maxWidth="lg">
            {myPets.length !== 0 ? (
                <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    <Grid item sm={12}>
                        <DashboardNotes user={user} />
                    </Grid>
                    <Grid item sm={12}>
                        <DashboardContacts user={user} />
                    </Grid>
                    <Grid item sm={12}>
                        <DashboardIncidents myPets={myPets} />
                    </Grid>
                    <Grid item sm={12}>
                        <DashboardMedications myPets={myPets} />
                    </Grid>
                    <Grid item sm={12}>
                        <DashboardVaccinations myPets={myPets} />
                    </Grid>
                    <Grid item sm={12}>
                        <DashboardVetVisits myPets={myPets} />
                    </Grid>
                </Grid>
            ) : (
                <>
                    <Typography>
                        Looks like you don't have a pet added yet!
                    </Typography>
                    <PetAddDialog userId={getCurrentUser().id} syncPets={syncPets} />
                </>
            )}
        </Container>
    );
};
