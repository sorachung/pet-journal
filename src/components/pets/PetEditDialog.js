import React, { useState, useEffect } from "react";
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
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";

export const PetEditDialog = ({ pet, syncPets, open, setOpen, sexes }) => {
    const [species, setSpecies] = useState([]);
    const [editedPet, updateEditedPet] = useState(pet);

    useEffect(() => {
        PetRepository.getSpecies().then((data) => setSpecies(data));
    }, []);

    const editPet = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedPet };
        delete copy.specie;
        delete copy.user;
        delete copy.sex;
        PetRepository.editPet(copy).then(() => syncPets());
    };

    const uploadImage = (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "xrfxvojq");
        data.append("cloud_name", "sorachung");
        //data.append("resource_type", "image");

        fetch("https://api.cloudinary.com/v1_1/sorachung/upload", {
            method: "POST",
            body: data,
        })
            .then((resp) => resp.json())
            .then((data) => {
                const copy = { ...editedPet };
                copy.photoURL = data.url;
                updateEditedPet(copy);
            })
            .catch((err) => console.log(err));
    };

    const handleClose = () => {
        setOpen(false);
        updateEditedPet(pet);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editPet}>
                <DialogTitle>Edit Pet</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            autoFocus
                            required
                            id="name"
                            label="Name"
                            InputLabelProps={{ shrink: true }}
                            value={editedPet.name}
                            onChange={(event) => {
                                const copy = { ...editedPet };
                                copy.name = event.target.value;
                                updateEditedPet(copy);
                            }}
                        />
                        <FormControl required sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel id="species-label">Species</InputLabel>
                            <Select
                                labelId="species-label"
                                id="species-label"
                                value={String(editedPet.specieId)}
                                label="Species"
                                onChange={(event) => {
                                    const copy = { ...editedPet };
                                    copy.specieId = parseInt(
                                        event.target.value
                                    );
                                    updateEditedPet(copy);
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
                            autoFocus
                            required
                            id="breed"
                            label="Breed"
                            InputLabelProps={{ shrink: true }}
                            value={editedPet.breed}
                            onChange={(event) => {
                                const copy = { ...editedPet };
                                copy.breed = event.target.value;
                                updateEditedPet(copy);
                            }}
                        />
                        <FormControl required sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel id="sex-label">Sex</InputLabel>
                            <Select
                                labelId="sex-label"
                                id="sex-label"
                                value={String(editedPet.sexId)}
                                label="Sex"
                                onChange={(event) => {
                                    const copy = { ...editedPet };
                                    copy.sex = parseInt(event.target.value);
                                    updateEditedPet(copy);
                                }}
                            >
                                {sexes?.map((sex) => (
                                    <MenuItem key={sex.id} value={sex.id}>
                                        {sex.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel shrink id="date-label">
                                Birthdate
                            </InputLabel>
                            <Input
                                id="date-label"
                                required
                                type="date"
                                value={editedPet.birthdate}
                                onChange={(event) => {
                                    const copy = { ...editedPet };
                                    copy.birthdate = event.target.value;
                                    updateEditedPet(copy);
                                }}
                            />
                        </FormControl>
                        <TextField
                            required
                            id="bioText"
                            label="Bio"
                            multiline
                            rows={3}
                            InputLabelProps={{ shrink: true }}
                            value={editedPet.bioText}
                            onChange={(event) => {
                                const copy = { ...editedPet };
                                copy.bioText = event.target.value;
                                updateEditedPet(copy);
                            }}
                        />
                        {editedPet.photoURL ? (
                            <>
                                <img
                                    src={editedPet.photoURL}
                                    style={{ maxWidth: "100%" }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        const copy = {...editedPet}
                                        copy.photoURL = null;
                                        updateEditedPet(copy)
                                    }}
                                >
                                    Delete photo
                                </Button>
                            </>
                        ) : (
                            <Button component="label" variant="contained">
                                Upload photo
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(event) =>
                                        uploadImage(event.target.files[0])
                                    }
                                />
                            </Button>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
