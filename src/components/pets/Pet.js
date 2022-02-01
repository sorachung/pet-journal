import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useResourceResolver from "../../hooks/resource/useResourceResolver"
import PetRepository from "../../repositories/PetRepository";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export const Pet = ({ pet }) => {
    const { resolveResource, resource: currentPet } = useResourceResolver();
    const { petId } = useParams();
    const history = useHistory()

    useEffect(() => {
        resolveResource(pet, petId, PetRepository.getExpandAll);
    }, []);

    const uploadPhoto = () => {
        return "";
    };

    const editPet = (event) => {
        history.push(`/mypets/${event.target.id}/edit`)
    }

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
                    <Button size="small" id={currentPet.id} onClick={editPet}>Edit</Button>
                </CardActions>
                
            </Card>
        </Container>
    );
};
