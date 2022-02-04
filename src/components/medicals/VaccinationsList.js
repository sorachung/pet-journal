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
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import { Vaccination } from "./Vaccination";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const VaccinationsList = ({ pet, dashboardView }) => {
    const [newPetVax, setNewPetVax] = useState({});
    const [myPetVax, setMyPetVax] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const syncPetVax = () => {
        MedicalRepository.getPetVaccinationsByPet(pet.id).then((data) => {
            if (dashboardView) {
                data = data.filter((petVax) => petVax.starred);
            }
            setMyPetVax(data);
        });
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

    const addPetVax = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...newPetVax };
        copy.petId = pet.id;
        copy.starred = false;
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
                <form onSubmit={addPetVax}>
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
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};
