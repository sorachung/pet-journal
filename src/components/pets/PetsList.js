import React, { useEffect, useState } from "react";
import PetRepository from "../../repositories/PetRepository";
import UserRepository from "../../repositories/UserRepository";
import { Pet } from "./Pet";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { useHistory } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { PetAddDialog } from "./PetAddDialog";

export const PetsList = () => {
    const [user, updateUser] = useState({});
    const [myPets, setMyPets] = useState([]);
    const { getCurrentUser } = useSimpleAuth();
    const history = useHistory();

    const syncPets = () => {
        PetRepository.getAllExpandAllByUser(getCurrentUser().id).then(
            (data) => {
                if(user.defaultPetId === 0 && data.length > 0) {
                    const copy = {...user};
                    copy.defaultPetId = data[0].id;
                    UserRepository.editAccount(copy)
                        .then(userData => {
                            history.push(history.location.pathname, userData)
                            data.sort((el1) => {
                                if (el1.id === userData.defaultPetId) {
                                    return -1;
                                }
                            });
                                setMyPets(data);
                        })
                } else if(data.length === 0) {
                    history.push(history.location.pathname, user)
                    history.push("/")
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
        syncUser();
        return () => {
            updateUser({})
        }
    }, []);

    useEffect(() => {
        syncPets();
    }, [user]);

    useEffect(() => {
        syncUser();
    }, [history.location.state]);

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                My Pets
            </Typography>
            <PetAddDialog userId={getCurrentUser().id} syncPets={syncPets} />
            <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                {myPets.map((pet) => (
                    <Grid item sm={6} lg={4} key={`pet--${pet.id}`}>
                        <Pet pet={pet} syncPets={syncPets} user={user} updateUser={updateUser}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
