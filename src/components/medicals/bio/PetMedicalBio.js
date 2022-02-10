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
import { AddAllergyDialog } from "./AddAllergyDialog";

export const PetMedicalBio = ({ pet, syncPets }) => {
    const [birthdate, setBirthdate] = useState("");
    const [chronicIllnesses, setChronicIllnesses] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const [open, setOpen] = useState(false);
    const [openAllergy, setOpenAllergy] = useState(false);

    const syncAllergies = () => {
        MedicalRepository.getPetAllergiesByPet(pet?.id).then((data) =>
            setAllergies(data)
        );
    };

    useEffect(() => {
        setBirthdate(getAge(pet?.birthdate));
        MedicalRepository.getChronicIllnessesByPet(pet?.id).then((data) =>
            setChronicIllnesses(data)
        );
        syncAllergies();
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

    const handleClickOpenAllergy = () => {
        setOpenAllergy(true);
    };

    return (
        <Container maxWidth="sm">
            <Box>
                <Card>
                    <CardContent>
                        <CardHeader
                            title="Medical bio"
                            sx={{ textAlign: "center" }}
                        />
                        <Typography variant="body1" color="text.secondary">
                            Species: {pet?.specie?.type}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Breed: {pet?.breed}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Sex: {pet?.sex?.label}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Age: {birthdate}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Weight:
                            {pet?.weight
                                ? pet.weight + " lbs"
                                : " none entered"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Microchip:{" "}
                            {pet?.microchipNumber
                                ? pet.microchipNumber
                                : " none"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Fixed: {pet?.isFixed ? "Yes" : "No"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Chronic illnesses:{" "}
                            {chronicIllnesses.map((ill) => ill.name).join(", ")}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Allergies:{" "}
                            {allergies
                                .map((allergy) => allergy.thing)
                                .join(", ")}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={handleClickOpen}>
                            Edit
                        </Button>
                        <Button size="small" onClick={handleClickOpenAllergy}>
                            Add allergy
                        </Button>
                    </CardActions>
                </Card>
            </Box>
            <EditBioDialog
                open={open}
                setOpen={setOpen}
                pet={pet}
                syncPets={syncPets}
                allergies={allergies}
                syncAllergies={syncAllergies}
            />
            <AddAllergyDialog openAllergy={openAllergy} setOpenAllergy={setOpenAllergy} pet={pet} syncAllergies={syncAllergies}/>
        </Container>
    );
};
