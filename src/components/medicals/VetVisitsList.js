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
import { VetVisit } from "./VetVisit";
import { PetsRounded } from "@mui/icons-material";

export const VetVisitsList = ({pet}) => {
    const [myPetVetVisits, setMyPetVetVisits] = useState([]);
    const { petId } = useParams();
    const [expanded, setExpanded] = useState(false);

    const syncVetVisits = () => {
        MedicalRepository.getAllVetVisitsByPet(pet.id).then((data) =>
            setMyPetVetVisits(data)
        );
    };

    useEffect(() => {
        syncVetVisits();
        return () => {
            setMyPetVetVisits([]);
        };
    }, [pet]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container>
            <Box sx={{ textAlign: "center" }}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title="Vet Visits" />
                        <Typography
                            gutterBottom
                            variant="h2"
                            fontSize="1em"
                            component="div"
                        >
                            {pet.name}
                        </Typography>
                        {myPetVetVisits.map((vetVisit) => (
                            <VetVisit
                                key={vetVisit.id}
                                vetVisit={vetVisit}
                                syncVetVisits={syncVetVisits}
                                handleChange={handleChange}
                                expanded={expanded}
                            />
                        ))}
                    </CardContent>
                    <CardActions>
                        <Button size="small">Edit</Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
};
