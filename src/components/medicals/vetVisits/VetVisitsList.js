import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import ContactsRepository from "../../../repositories/ContactsRepository";
import { AddVetVisitDialog } from "./AddVetVisitDialog"
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import { VetVisit } from "./VetVisit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export const VetVisitsList = ({ pet, dashboardView }) => {
    const [myPetVetVisits, setMyPetVetVisits] = useState([]);
    const [vets, setVets] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncVetVisits = () => {
        MedicalRepository.getAllVetVisitsByPet(pet.id).then((data) => {
            if (dashboardView) {
                data = data.filter((vetVisit) => vetVisit.starred);
                setMyPetVetVisits(data);
            } else {
                setMyPetVetVisits(data);
            }
        });
    };

    useEffect(() => {
        ContactsRepository.getVetContacts().then((data) => setVets(data));
        syncVetVisits();
        return () => {
            setMyPetVetVisits([]);
        };
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
                <AddVetVisitDialog pet={pet} vets={vets} syncVetVisits={syncVetVisits}/>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title={`${pet ? pet.name + "'s ": ""} Vet Visits`}/>
                        
                        {myPetVetVisits.map((vetVisit) => (
                            <VetVisit
                                key={vetVisit.id}
                                vetVisit={vetVisit}
                                syncVetVisits={syncVetVisits}
                                handleChange={handleChange}
                                expanded={expanded}
                                vets={vets}
                            />
                        ))}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};
