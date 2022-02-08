import React, { useEffect, useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import { EditBioDialog } from "./EditBioDialog";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";


export const PetMedicalBio = ({ pet, syncPets }) => {
    const [birthdate, setBirthdate] = useState("");
    const [chronicIllnesses, setChronicIllnesses] = useState([]);
    const [editedPet, setEditedPet] = useState(pet);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setBirthdate(getAge(pet?.birthdate));
        MedicalRepository.getChronicIllnessesByPet(pet?.id).then((data) =>
            setChronicIllnesses(data)
        );
    }, [pet]);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: "center" }}>
                <Card>
                    <CardContent>
                        <CardHeader title="Medical bio" />
                        <Typography variant="string" color="text.secondary">
                            <p>Species: {pet?.specie?.type}</p>
                            <p>Breed: {pet?.breed}</p>
                            <p>Sex: {pet?.sex?.label}</p>
                            <p>Age: {birthdate}</p>
                            <p>
                                Weight:
                                {pet?.weight
                                    ? pet.weight + " lbs"
                                    : " none entered"}
                            </p>
                            <p>
                                Microchip:
                                {pet?.microchipNumber
                                    ? pet.microchipNumber
                                    : " none"}
                            </p>
                            <p>Fixed: {pet?.isFixed ? "Yes" : "No"}</p>
                            <p>Chronic illnesses:</p>
                            <ul>
                                {chronicIllnesses.map((ill) => (
                                    <li key={ill.id}>{ill.name}</li>
                                ))}
                            </ul>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={handleClickOpen}>
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            </Box>
            <EditBioDialog
                open={open}
                setOpen={setOpen}
                pet={pet}
                syncPets={syncPets}
            />
        </Container>
    );
};
