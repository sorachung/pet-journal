import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PetRepository from "../../repositories/PetRepository";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import UserRepository from "../../repositories/UserRepository";

export const PetAddDialog = ({ userId, syncPets }) => {
    const [open, setOpen] = useState(false);
    const [species, setSpecies] = useState([]);
    const [sexes, setSexes] = useState([]);
    const history = useHistory();
    const [newPet, updateNewPet] = useState({
        name: "",
        specieId: "",
        breed: "",
        sexId: "",
        birthdate: "",
        bioText: "",
        userId: userId,
        weight: null,
        microchipNumber: null,
        isFixed: false,
        profilePhotoId: null,
    });

    useEffect(() => {
        PetRepository.getSpecies().then((data) => setSpecies(data));
        PetRepository.getSexes().then((data) => setSexes(data));
    }, []);

    const addNewPet = (event) => {
        event.preventDefault();
        handleClose();
        PetRepository.addPet(newPet).then((newPetData) => {
            syncPets()
            UserRepository.get(userId)
            .then((data) => {
                if(data.defaultPetId === 0) {
                    data.defaultPetId = newPetData.id;
                }
                UserRepository.editAccount(data)
                    .then((userData) => history.push(history.location.pathname, userData))
            })
        });
        
        history.push("/mypets")
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Typography align="center">
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ marginBottom: "2em" }}
                >
                    Add a pet
                </Button>
            </Typography>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={addNewPet}>
                    <DialogTitle>Add Pet</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            id="name"
                            label="Name"
                            onChange={(event) => {
                                const copy = { ...newPet };
                                copy.name = event.target.value;
                                updateNewPet(copy);
                            }}
                        />
                        <FormControl required sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel id="species-label">Species</InputLabel>
                            <Select
                                labelId="species-label"
                                id="species"
                                value={newPet.specieId}
                                label="Species"
                                onChange={(event) => {
                                    const copy = { ...newPet };
                                    copy.specieId = parseInt(
                                        event.target.value
                                    );
                                    updateNewPet(copy);
                                }}
                            >
                                {species.map((specie) => (
                                    <MenuItem
                                        key={`specie--${specie.id}`}
                                        value={specie.id}
                                    >
                                        {specie.type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            id="breed"
                            label="Breed"
                            onChange={(event) => {
                                const copy = { ...newPet };
                                copy.breed = event.target.value;
                                updateNewPet(copy);
                            }}
                        />
                        <FormControl required sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel id="sex-label">Sex</InputLabel>
                            <Select
                                labelId="sex-label"
                                id="sex"
                                value={newPet.sexId}
                                label="Sex"
                                onChange={(event) => {
                                    const copy = { ...newPet };
                                    copy.sexId = parseInt(event.target.value);
                                    updateNewPet(copy);
                                }}
                            >
                                {sexes.map(sex => <MenuItem key={sex.id} value={sex.id}>
                                    {sex.label}
                                </MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel shrink id="secondaryColor-label">
                                Birthdate
                            </InputLabel>
                            <Input
                                required
                                type="date"
                                onChange={(event) => {
                                    const copy = { ...newPet };
                                    copy.birthdate = event.target.value;
                                    updateNewPet(copy);
                                }}
                            />
                        </FormControl>
                        <TextField
                            required
                            id="bioText"
                            label="Bio"
                            multiline
                            rows={3}
                            onChangeCapture={(event) => {
                                const copy = { ...newPet };
                                copy.bioText = event.target.value;
                                updateNewPet(copy);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" type="submit">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
