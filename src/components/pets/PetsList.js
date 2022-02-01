import React, { useEffect, useState } from "react";
import PetRepository from "../../repositories/PetRepository";
import { Pet } from "./Pet";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { useHistory } from "react-router-dom";


import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export const PetsList = () => {
    const [myPets, setMyPets] = useState([]);
    const { getCurrentUser } = useSimpleAuth();
    const history = useHistory();

    useEffect( () => {
        PetRepository.getAllExpandAllByUser(getCurrentUser().id)
            .then(data => setMyPets(data));
    }, [])

    const addPet = () => {
        history.push("/mypets/add")
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em" >
                My Pets
            </Typography>
            <Button variant="contained" onClick={addPet}>Add a pet</Button>
            
            <Grid container spacing={2} sx={{justifyContent:"center"}}>
                {myPets.map(pet => 
                    <Grid item sm={6} key={`pet--${pet.id}`}>
                        <Pet pet={pet}/>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}