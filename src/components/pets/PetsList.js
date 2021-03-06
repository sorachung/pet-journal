import React, { useState, useEffect } from "react";
import PetRepository from "../../repositories/PetRepository";
import UserRepository from "../../repositories/UserRepository";
import { Pet } from "./Pet";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { useHistory } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PetAddDialog } from "./PetAddDialog";

export const PetsList = ({ user, updateUser, myPets, setMyPets }) => {
    const { getCurrentUser } = useSimpleAuth();
    const [sexes, setSexes] = useState([]);

    const syncPets = () => {
            PetRepository.getAllExpandAllByUser(user.id).then(
                (data) => {
                    if (user.defaultPetId === 0 && data.length > 0) {
                        const copy = { ...user };
                        copy.defaultPetId = data[0].id;
                        UserRepository.editAccount(copy).then((userData) => {
                            syncUser();
                            data.sort((el1) => {
                                if (el1.id === userData.defaultPetId) {
                                    return -1;
                                }
                            });
                            setMyPets(data);
                        });
                    }
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
        syncPets();
    }, [user]);

    useEffect(() => {
        syncPets();
        PetRepository.getSexes().then((data) => setSexes(data));
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center" >
                My Pets
            </Typography>
            <PetAddDialog userId={getCurrentUser().id} syncPets={syncPets} sexes={sexes}/>
            <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                {myPets.map((pet) => (
                    <Grid item sm={6} lg={4} key={`pet--${pet.id}`}>
                        <Pet
                            pet={pet}
                            syncPets={syncPets}
                            user={user}
                            updateUser={updateUser}
                            sexes={sexes}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
