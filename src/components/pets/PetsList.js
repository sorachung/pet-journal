import React, { useEffect, useState } from "react";
import PetRepository from "../../repositories/PetRepository";
import { Pet } from "./Pet";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"


import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export const PetsList = () => {
    const [pets, setPets] = useState([]);
    const { getCurrentUser } = useSimpleAuth();

    useEffect( () => {
        PetRepository.getAllExpandAllByUser(getCurrentUser().id)
            .then(data => setPets(data));
    }, [])

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em" >
                My Pets
            </Typography>
            
            <Grid container spacing={2} sx={{justifyContent:"center"}}>
                {pets.map(pet => 
                    <Grid item sm={6} key={`pet--${pet.id}`}>
                        <Pet pet={pet}/>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}