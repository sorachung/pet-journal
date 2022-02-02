import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import PetRepository from "../../repositories/PetRepository";
import MedicalRepository from "../../repositories/MedicalRepository";
import { Incident } from "./Incident";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";

export const IncidentsList = ({pet}) => {
    const { resolveResource, resource: chosenPet } = useResourceResolver();
    const [ myPetsIncidents, setMyPetsIncidents ] = useState([])
    const { petId } = useParams();
    const [expanded, setExpanded] = useState(false);

    const syncIncidents = () => {
        MedicalRepository.getAllIncidentsByPet(chosenPet.id)
            .then((data) => setMyPetsIncidents(data))
    }

    useEffect(() => {
        resolveResource(pet, petId, PetRepository.getExpandAll);
    }, []);

    useEffect(() => {
        syncIncidents()
        return () => {
            setMyPetsIncidents([])
        }
    }, [chosenPet]);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <Container >
            <Box sx={{ textAlign: "center" }}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title="Incidents" />
                        <Typography
                            gutterBottom
                            variant="h2"
                            fontSize="1em"
                            component="div"
                        >
                            {chosenPet.name}
                        </Typography>
                        {myPetsIncidents.map(incident => 
                            <Incident key={incident.id} incident={incident} syncIncidents={syncIncidents} handleChange={handleChange} expanded={expanded}/>
                        )}
                    </CardContent>
                    <CardActions>
                        <Button size="small">
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
}