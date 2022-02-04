import React, { useEffect, useState } from "react";
import PetRepository from "../../repositories/PetRepository";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import { useParams } from "react-router-dom";

export const EditPetForm = () => {
    const { resolveResource, resource: currentPet } = useResourceResolver();
    const { petId } = useParams();
    const [species, setSpecies] = useState([]);
    const [editedPet, updateEditedPet] = useState({});
    const history = useHistory();

    useEffect(() => {
        resolveResource(null, petId, PetRepository.getExpandAll);
    }, []);

    useEffect(() => {
        PetRepository.getSpecies().then((data) => setSpecies(data));
    }, []);

    useEffect(() => {
        const copy = { ...currentPet };
        delete copy.specie;
        delete copy.user;
        delete copy.sex;
        updateEditedPet(copy);
    }, [currentPet]);

    const editPet = (event) => {
        event.preventDefault();
        PetRepository.editPet(editedPet).then(() => {
            history.push("/mypets");
        });
    };

    return (
        <Box
            component="div"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                display: "flex",
                flexDirection: "column",
            }}
            noValidate
        >
            {editedPet.hasOwnProperty("id") ? (
                <form onSubmit={editPet}>
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
                                copy.specieId = parseInt(event.target.value);
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
                            <MenuItem key={`female`} value={1}>
                                Female
                            </MenuItem>
                            <MenuItem key={`male`} value={2}>
                                Male
                            </MenuItem>
                            <MenuItem key={`other`} value={3}>
                                Other
                            </MenuItem>
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
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </form>
            ) : (
                ""
            )}
        </Box>
    );
};
