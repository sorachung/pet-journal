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
import { Medication } from "./Medication";
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
import TextField from "@mui/material/TextField";

export const MedicationsList = ({ pet }) => {
    const [myPetMedications, setMyPetMedications] = useState([]);
    const [newPetMed, setNewPetMed] = useState({petId:pet.id});
    const { petId } = useParams();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const syncPetMedications = () => {
        MedicalRepository.getMedicationsByPet(pet.id).then((data) =>
            setMyPetMedications(data)
        );
    };

    useEffect(() => {
        syncPetMedications();
        return () => {
            setMyPetMedications([]);
        };
    }, [pet]);
    
    const addPetMed = () => {
        MedicalRepository.addPetMedication(newPetMed).then(() =>
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
        <Container>
            <Box sx={{ textAlign: "center" }}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title="Medications" />
                        <Button variant="contained" onClick={handleClickOpen}>
                            Add med
                        </Button>
                        <Typography
                            gutterBottom
                            variant="h2"
                            fontSize="1em"
                            component="div"
                        >
                            {pet.name}
                        </Typography>
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
                    <CardActions>
                        <Button size="small">Edit</Button>
                    </CardActions>
                </Card>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Vaccination Record</DialogTitle>
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
                        control={<Checkbox onChange={(event) => {
                            const copy = { ...newPetMed };
                            copy.isCurrent = event.target.checked;
                            setNewPetMed(copy);
                            
                        }}/>}
                        label="Is Current?"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            addPetMed();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
