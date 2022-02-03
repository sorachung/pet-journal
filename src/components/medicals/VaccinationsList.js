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
import { Vaccination } from "./Vaccination";
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

export const VaccinationsList = ({pet}) => {
    const [newPetVax, setNewPetVax] = useState({})
    const [myPetVax, setMyPetVax] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const syncPetVax = () => {
        MedicalRepository.getPetVaccinationsByPet(pet.id).then((data) =>
            setMyPetVax(data)
        );
    };

    useEffect(() => {
        syncPetVax();
        return () => {
            setMyPetVax([]);
        };
    }, [pet]);

    useEffect(() => {
        MedicalRepository.getAllVaccinations().then((data) =>
            setVaccinations(data)
        );
    }, []);

    const addPetVax = () => {
        const copy = {...newPetVax}
        copy.petId = pet.id
        MedicalRepository.addPetVaccination(copy).then((data) =>
            syncPetVax(data)
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
                        <CardHeader title="Vaccinations" />
                        <Button variant="contained" onClick={handleClickOpen}>
                            Add vaccination
                        </Button>
                        <Typography
                            gutterBottom
                            variant="h2"
                            fontSize="1em"
                            component="div"
                        >
                        {pet.name}
                        </Typography>
                        {myPetVax.map((petVax) => (
                            <Vaccination
                                key={petVax.id}
                                petVax={petVax}
                                syncPetVax={syncPetVax}
                                handleChange={handleChange}
                                expanded={expanded}
                            />
                        ))}
                    </CardContent>
                </Card>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Vaccination Record</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="date"
                        label="date"
                        required
                        type="date"
                        onChange={(event) => {
                            const copy = { ...newPetVax };
                            copy.date = event.target.value;
                            setNewPetVax(copy);
                        }}
                    />

                    <FormControl required sx={{ m: 1, minWidth: 225 }}>
                        <InputLabel id="shot-label">Vaccination</InputLabel>
                        <Select
                            labelId="Vaccination-label"
                            id="Vaccination"
                            value={newPetVax.vaccinationId}
                            label="vaccination"
                            onChange={(event) => {
                                const copy = { ...newPetVax };
                                copy.vaccinationId = parseInt(
                                    event.target.value
                                );
                                setNewPetVax(copy);
                            }}
                        >
                            {vaccinations.map((vax) => (
                                <MenuItem
                                    key={`vaccination--${vax.id}`}
                                    value={vax.id}
                                >
                                    {vax.shot}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            addPetVax();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
