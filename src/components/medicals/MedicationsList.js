import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MedicalRepository from "../../repositories/MedicalRepository";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import { Medication } from "./Medication";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

export const MedicationsList = ({ pet, dashboardView }) => {
    const [myPetMedications, setMyPetMedications] = useState([]);
    const [newPetMed, setNewPetMed] = useState({ isCurrent: false });
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const syncPetMedications = () => {
        MedicalRepository.getMedicationsByPet(pet.id).then((data) => {
            if (dashboardView) {
                data = data.filter((petMed) => petMed.starred);
            }
            setMyPetMedications(data);
        });
    };

    useEffect(() => {
        syncPetMedications();
        return () => {
            setMyPetMedications([]);
        };
    }, [pet]);

    const addPetMed = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...newPetMed };
        copy.starred = false;
        copy.petId = pet.id;
        MedicalRepository.addPetMedication(copy).then(() =>
            syncPetMedications()
        );
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
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
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title="Medications" />
                        <Button variant="contained" onClick={handleClickOpen}>
                            Add med
                        </Button>
                        {myPetMedications.map((myPetMed) => (
                            <Medication
                                key={myPetMed.id}
                                myPetMed={myPetMed}
                                syncPetMedications={syncPetMedications}
                                handleChange={handleChange}
                                expanded={expanded}
                            />
                        ))}
                    </CardContent>
                </Card>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={addPetMed}>
                    <DialogTitle>Add Medication Record</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="name"
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...newPetMed };
                                copy.name = event.target.value;
                                setNewPetMed(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="dosage"
                            label="dosage"
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...newPetMed };
                                copy.dosage = event.target.value;
                                setNewPetMed(copy);
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(event) => {
                                        const copy = { ...newPetMed };
                                        copy.isCurrent = event.target.checked;
                                        setNewPetMed(copy);
                                    }}
                                />
                            }
                            label="Is Current?"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};
