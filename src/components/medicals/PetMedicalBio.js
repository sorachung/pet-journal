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

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const PetMedicalBio = ({ pet }) => {
    const [birthdate, setBirthdate] = useState("");
    const [petVax, setPetVax] = useState([]);
    const [petMeds, setPetMeds] = useState([]);
    const [chronicIllnesses, setChronicIllnesses] = useState([]);
    const [editedPet, setEditedPet] = useState(pet);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setBirthdate(getAge(pet?.birthdate));
        MedicalRepository.getMedicationsByPet(pet.id).then((data) =>
            setPetMeds(data)
        );
        MedicalRepository.getPetVaccinationsByPet(pet.id).then((data) =>
            setPetVax(data)
        );
        MedicalRepository.getChronicIllnessesByPet(pet.id).then((data) =>
            setChronicIllnesses(data)
        );

        return () => {
            setPetVax([]);
            setPetMeds([]);
        };
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                            <p>
                                Birthdate: {pet?.birthdate} - {birthdate}
                            </p>
                            <p>Weight: {pet?.weight ? pet.weight + " lbs" : "None entered"}</p>
                            <p>
                                Microchip:{" "}
                                {pet?.microchipNumber
                                    ? pet.microchipNumber
                                    : "none"}
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="weight"
                        label="Weight in lbs"
                        value={editedPet.weight}
                        required
                        type="number"
                        onChange={(event) => {
                            const copy = { ...editedPet };
                            copy.weight = parseInt(event.target.value);
                            setEditedPet(copy);
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="microchip"
                        label="Microchip #"
                        type="number"
                        required
                        value={editedPet.microchip ? editedPet.microchip : 0}
                        fullWidth
                        onChange={(event) => {
                            const copy = { ...editedPet };
                            if (event.target.value === "0") {
                                copy.microchip = null;
                            } else {
                                copy.microchip = event.target.value;
                            }
                            setEditedPet(copy);
                        }}
                    />
                    
                    <FormControlLabel
                        control={<Checkbox checked={editedPet.isFixed} onChange={(event) => {
                            const copy = { ...editedPet };
                            copy.isFixed = event.target.checked;
                            setEditedPet(copy);
                            
                        }}/>}
                        label="Is Fixed?"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            editBio();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
