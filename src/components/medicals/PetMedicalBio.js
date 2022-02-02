import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PetRepository from "../../repositories/PetRepository";
import MedicalRepository from "../../repositories/MedicalRepository";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";

export const PetMedicalBio = ({ pet }) => {
    const [birthdate, setBirthdate] = useState("");
    const [ petVax, setPetVax ] = useState([]);
    const [ petMeds, setPetMeds ] = useState([]);
    const [ chronicIllnesses, setChronicIllnesses ] = useState([]);

    useEffect(() => {
        setBirthdate(getAge(pet?.birthdate));
        MedicalRepository.getMedicationsByPet(pet.id)
            .then(data => setPetMeds(data))
        MedicalRepository.getPetVaccinationsByPet(pet.id)
            .then(data => setPetVax(data))
        MedicalRepository.getChronicIllnessesByPet(pet.id)
            .then(data => setChronicIllnesses(data))

        return () => {
            setPetVax([])
            setPetMeds([])
        }
    }, [pet]);

    const editBio = () => {};

    const getAge = (dateString) => {
        const today = new Date();
        const birthdate = new Date(dateString);
        let age = today.getFullYear() - birthdate.getFullYear();
        let month = today.getMonth() - birthdate.getMonth();
        const date = today.getDate() - birthdate.getDate();
        if (
            month < 0 ||
            (month === 0 && today.getDate() < birthdate.getDate())
        ) {
            age--;
            month--;
            
        }
        return age + " and " + ((12 + month) % 12) + " months";
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
                <Card>
                    <CardContent>
                        <CardHeader title="Medical bio" />
                        <Typography
                            gutterBottom
                            variant="h2"
                            fontSize="1em"
                            component="div"
                        >
                            {pet?.name}
                        </Typography>
                        <Typography variant="string" color="text.secondary">
                            <p>Species: {pet?.specie?.type}</p>
                            <p>Breed: {pet?.breed}</p>
                            <p>Sex: {pet?.sex?.label}</p>
                            <p>Birthdate: {pet?.birthdate} - {birthdate}</p>
                            <p>Weight: {pet?.weight} lbs</p>
                            <p>Microchip: {pet?.microchipNumber ? pet.microchipNumber : "none"}</p>
                            <p>Fixed: {pet?.isFixed ? "Yes" : "No"}</p>
                            
                            <p>Current medications: </p>
                            <ul>
                            {petMeds.map(med => <li key={med.id}>{med.name} at {med.dosage}</li>)}
                            </ul>
                            <p>Latest vaccinations: </p>
                            <ul>
                            {petVax.map(vax => <li key={vax.id}>{vax.vaccination.shot} on {vax.date}</li>)}
                            </ul>
                            <p>Chronic illnesses:</p>
                            <ul>
                            {chronicIllnesses.map(ill => <li key={ill.id}>{ill.name}</li>)}
                            </ul>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={editBio}>
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
};
