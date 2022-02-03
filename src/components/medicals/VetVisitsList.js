import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import PetRepository from "../../repositories/PetRepository";
import MedicalRepository from "../../repositories/MedicalRepository";
import ContactsRepository from "../../repositories/ContactsRepository";
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

export const VetVisitsList = ({ pet }) => {
    const [myPetVetVisits, setMyPetVetVisits] = useState([]);
    const { petId } = useParams();
    const [newVetVisit, setNewVetVisit] = useState({});
    const [vets, setVets] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const syncVetVisits = () => {
        MedicalRepository.getAllVetVisitsByPet(pet.id).then((data) =>
            setMyPetVetVisits(data)
        );
    };

    useEffect(() => {
        ContactsRepository.getVetContacts()
            .then(data => setVets(data))
        syncVetVisits();
        return () => {
            setMyPetVetVisits([]);
        };
    }, []);

    const addVetVisit = () => {
        const copy = { ...newVetVisit };
        copy.petId = pet.id;
        copy.starred = false;
        copy.invoicePicURL = null;
        MedicalRepository.addVetVisit(copy).then(() => syncVetVisits());
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
                        <CardHeader title="Vet Visits" />
                        <Button variant="contained" onClick={handleClickOpen}>
                            Add vet visit
                        </Button>
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
                                vets={vets}
                            />
                        ))}
                    </CardContent>
                </Card>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add vet visit</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="date"
                        label="date"
                        required
                        type="date"
                        onChange={(event) => {
                            const copy = { ...newVetVisit };
                            copy.date = event.target.value;
                            setNewVetVisit(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="description"
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...newVetVisit };
                            copy.description = event.target.value;
                            setNewVetVisit(copy);
                        }}
                    />
                    <FormControl required sx={{ m: 1, minWidth: 225 }}>
                        <InputLabel id="shot-label">Vet location</InputLabel>
                        <Select
                            labelId="vet-label"
                            id="vet"
                            value={newVetVisit.vetId}
                            label="vet"
                            onChange={(event) => {
                                const copy = { ...newVetVisit };
                                copy.vetId = parseInt(
                                    event.target.value
                                );
                                setNewVetVisit(copy);
                            }}
                        >
                            {vets.map((vet) => (
                                <MenuItem
                                    key={`incident-vet--${vet.id}`}
                                    value={vet.id}
                                >
                                    {vet.name}
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
                            addVetVisit();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
