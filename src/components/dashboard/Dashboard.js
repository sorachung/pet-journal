import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { ContactList } from "../contacts/ContactList";
import { ViewMedical } from "../medicals/ViewMedical";
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

export const Dashboard = () => {
    const [user, setUser] = useState();
    const [defaultPet, setDefaultPet] = useState({});
    const [myPets, setMyPets] = useState([])
    const { getCurrentUser } = useSimpleAuth();
    const history = useHistory();
    const [dashboardView, setDashboardView] = useState(true);

    useEffect(() => {
        UserRepository.get(getCurrentUser().id).then((data) => setUser(data));
        PetRepository.findPetsByUser(getCurrentUser().id).then(data => setMyPets(data))
    }, []);

    useEffect(() => {
        if (user?.defaultPetId) {
            PetRepository.getExpandAll(user?.defaultPetId).then((data) =>
                setDefaultPet(data)
            );
        }
    }, [user]);

    
    const addPet = () => {
        history.push("/mypets/add");
    };


    return (
        <Container maxWidth="lg">
            {myPets.length !== 0 ? (
                <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    <Grid item sm={6}>
                        <Pet pet={defaultPet} />
                    </Grid>
                    <Grid item sm={12}>
                        <DashboardNotes user={user} />
                    </Grid>
                    <Grid item sm={6}>
                        <ContactList dashboardView={dashboardView} />
                    </Grid>
                    <Grid item sm={12}>
                        <DashboardIncidents myPets={myPets}/>
                    </Grid>
                    <Grid item sm={12}>
                        <DashboardMedications myPets={myPets}/>
                    </Grid>
                    <Grid item sm={12}>
                        <DashboardVaccinations myPets={myPets}/>
                    </Grid>
                    <Grid item sm={12}>
                        <DashboardVetVisits myPets={myPets}/>
                    </Grid>
                </Grid>
            ) : (
                <>
                    <Typography>
                        Looks like you don't have a pet added yet!
                    </Typography>
                    <Button variant="contained" onClick={addPet}>
                        Add a pet
                    </Button>
                </>
            )}
        </Container>
    );
};
