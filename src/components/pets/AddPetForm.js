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

export const AddPetForm = () => {
    const { getCurrentUser } = useSimpleAuth();
    const [species, setSpecies] = useState([]);
    const [newPet, updateNewPet] = useState({
        name: "",
        specieId: "",
        breed: "",
        sexId: 0,
        birthdate: "",
        bioText: "",
        userId: getCurrentUser().id,
        weight: null,
        microchipNumber: null,
        isFixed: false,
        photoId: null,
    });
    const history = useHistory();

    useEffect(() => {
        PetRepository.getSpecies().then((data) => setSpecies(data));
    }, []);

    const addNewPet = (event) => {
        event.preventDefault();
        PetRepository.addPet(newPet);
        history.push("/mypets");
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
            <form onSubmit={addNewPet}>
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
                            copy.specieId = parseInt(event.target.value);
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
                <Button variant="contained" type="submit">
                    Add
                </Button>
            </form>
        </Box>
    );
};
