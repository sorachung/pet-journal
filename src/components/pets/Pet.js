import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useResourceResolver from "../../hooks/resource/useResourceResolver"
import PetRepository from "../../repositories/PetRepository";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export const Pet = ({ pet, setMyPets }) => {
    const { resolveResource, resource: currentPet } = useResourceResolver();
    const { petId } = useParams();
    const history = useHistory()
    const { getCurrentUser } = useSimpleAuth();

    useEffect(() => {
        resolveResource(pet, petId, PetRepository.getExpandAll);
    }, []);

    const uploadPhoto = () => {
        return "";
    };

    const editPet = () => {
        history.push(`/mypets/${currentPet.id}/edit`)
    }

    const deletePet = () => {
        PetRepository.delete(currentPet.id)
            .then( () => {
                PetRepository.getAllExpandAllByUser(getCurrentUser().id)
                    .then(data => {
                        const regex = new RegExp("[0-9]+$");
                        if(history.location.pathname.search(regex) !== -1) {
                            history.push("/mypets")
                        } else {
                            setMyPets(data)
                        }
                    });
            })
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
                        <p>Sex: {currentPet.sex?.label}</p>
                        <p>Birthdate: {currentPet.birthdate}</p>
                        <p>Bio: {currentPet.bioText}</p>

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={editPet}>Edit</Button>
                    <Button size="small" onClick={deletePet}>Remove</Button>
                </CardActions>
                
            </Card>
        </Container>
    );
};
