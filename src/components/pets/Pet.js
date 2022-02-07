import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import PetRepository from "../../repositories/PetRepository";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Pet = ({ pet, syncPets }) => {

    const editPet = () => {
    };

    const deletePet = () => {
        PetRepository.delete(pet.id).then(() => syncPets());
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

                        <Button size="small" onClick={editPet}>
                            Edit
                        </Button>
                        <Button size="small" onClick={deletePet}>
                            Remove
                        </Button>
                </CardActions>
            </Card>
        </Container>
    );
};
