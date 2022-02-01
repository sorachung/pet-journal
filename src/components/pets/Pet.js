import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import { AddPetForm } from "./AddPetForm";
import { EditPetForm } from "./EditPetForm";
import PetRepository from "../../repositories/PetRepository";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Pet = ({ pet }) => {
    const { resolveResource, resource: currentPet } = useResourceResolver();
    const { petId } = useParams();

    useEffect(() => {
        resolveResource(pet, petId, PetRepository.getExpandAll);
    }, []);

    const uploadPhoto = () => {
        return "";
    };

    return (
        <Container maxWidth="md">
            <Card sx={{ minWidth: 200 }}>
                <CardMedia
                    component="img"
                    width="inherit"
                    image="https://cdn-icons-png.flaticon.com/512/12/12638.png"
                    alt="paw print"
                />
                <CardContent>
                    <Typography gutterBottom variant="h2" fontSize="1.5em" component="div">
                        {currentPet.name}
                    </Typography>
                    <Typography variant="string" color="text.secondary">
                        <p>Species: {currentPet.specie?.type}</p>
                        <p>Breed: {currentPet.breed}</p>
                        <p>Sex: {currentPet.sex}</p>
                        <p>Birthdate: {currentPet.birthdate}</p>
                        <p>Bio: {currentPet.bioText}</p>

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Edit</Button>
                </CardActions>
                
            </Card>
        </Container>
    );
};
