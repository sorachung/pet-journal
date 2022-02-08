import React, { useState } from "react";
import PetRepository from "../../repositories/PetRepository";
import { useHistory } from "react-router-dom";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { PetEditDialog } from "./PetEditDialog";
import UserRepository from "../../repositories/UserRepository";

export const Pet = ({ pet, syncPets, user, updateUser, sexes }) => {
    const [open, setOpen] = useState(false);

    const deletePet = () => {
        PetRepository.delete(pet.id).then(() => {
            syncPets()
            if(user.defaultPetId === pet.id) {
                const copy = {...user}
                copy.defaultPetId = 0;
                UserRepository.editAccount(copy)
                    .then(data => {
                        updateUser(data)
                    })
                
            }
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <Container maxWidth="md">
            <Card sx={{ minWidth: 200 }}>
                <CardMedia
                    component="img"
                    image="https://cdn-icons-png.flaticon.com/512/12/12638.png"
                    alt="paw print"
                    sx={{width: "100%", height: "auto"}}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h2"
                        fontSize="1.5em"
                        component="div"
                    >
                        {pet?.name}
                    </Typography>
                    <Typography variant="string" color="text.secondary">
                        <p>Species: {pet?.specie?.type}</p>
                        <p>Breed: {pet?.breed}</p>
                        <p>Sex: {pet?.sex?.label}</p>
                        <p>Birthdate: {pet?.birthdate}</p>
                        <p>Bio: {pet?.bioText}</p>
                    </Typography>
                </CardContent>
                <CardActions>

                        <Button size="small" onClick={handleClickOpen}>
                            Edit
                        </Button>
                        <Button size="small" onClick={deletePet}>
                            Remove
                        </Button>
                </CardActions>
            </Card>
            <PetEditDialog pet={pet} syncPets={syncPets} open={open} setOpen={setOpen} sexes={sexes}/>
        </Container>
    );
};
