import React, { useEffect, useState } from "react";
import PetRepository from "../../repositories/PetRepository";
import UserRepository from "../../repositories/UserRepository";
import { Pet } from "./Pet";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { useHistory } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export const PetsList = () => {
    const [user, updateUser] = useState({});
    const [myPets, setMyPets] = useState([]);
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
            updateUser(data)
        });
    };

    useEffect(() => {
        syncUser();
        
    }, []);

    useEffect(() => {
        syncPets()
    },[user])

    useEffect(() => {
        UserRepository.get(getCurrentUser().id).then((data) => {
            updateUser(data);
        });
    }, [history.location.state]);

    const addPet = () => {
        history.push("/mypets/add");
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                My Pets
            </Typography>
            <Button variant="contained" onClick={addPet}>
                Add a pet
            </Button>

            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                {myPets.map((pet) => (
                    <Grid item sm={6} key={`pet--${pet.id}`}>
                        <Pet pet={pet} setMyPets={setMyPets} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
