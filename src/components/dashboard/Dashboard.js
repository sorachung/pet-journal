import React, {useState, useEffect} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {ContactList} from "../contacts/ContactList"
import { Pet } from "../pets/Pet";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import UserRepository from "../../repositories/UserRepository";
import PetRepository from "../../repositories/PetRepository";
import { useHistory } from "react-router-dom";

export const Dashboard = () => {
    const [user, setUser] = useState()
    const [defaultPet, setDefaultPet] = useState()
    const { getCurrentUser } = useSimpleAuth()
    const history = useHistory();

    useEffect( () => {
        UserRepository.get(getCurrentUser().id)
            .then(data => setUser(data))
    }, [])

    useEffect( () => {
        if(user?.defaultPetId) {
            PetRepository.getExpandAll(user?.defaultPetId)
                .then((data) => setDefaultPet(data))
        }
    }, [user])

    useEffect(() => {
        UserRepository.get(getCurrentUser().id).then((data) => {
            setUser(data);
        });
    }, [history.location.state]);


    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    <Grid item sm={6}>
                        <Pet pet={defaultPet}/>
                    </Grid>
                    <Grid item sm={6}>
                    </Grid>
                    <Grid item sm={12}>
                        <ContactList />
                    </Grid>
            </Grid>
        </Container>
    );
};
