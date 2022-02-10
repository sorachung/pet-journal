import React, { useEffect, useState } from "react";
import PetRepository from "../../../repositories/PetRepository";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MedicalRepository from "../../../repositories/MedicalRepository";

export const EditBioDialog = ({
    pet,
    syncPets,
    open,
    setOpen,
    allergies,
    syncAllergies,
}) => {
    const [editedPet, setEditedPet] = useState(pet);

    const editBio = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedPet };
        delete copy.sex;
        delete copy.specie;
        delete copy.user;

        PetRepository.editPet(copy).then(() => syncPets());
    };

    const removeAllergy = (allergy) => {
        MedicalRepository.deletePetAllergy(allergy.id).then((data) =>
            syncAllergies()
        );
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setEditedPet(pet);
    }, [pet]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editBio}>
                <DialogTitle>Edit Bio</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="weight"
                        label="Weight in lbs"
                        value={editedPet?.weight}
                        required
                        type="number"
                        onChange={(event) => {
                            const copy = { ...editedPet };
                            copy.weight = parseInt(event.target.value);
                            setEditedPet(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="microchip"
                        label="Microchip #"
                        type="number"
                        required
                        value={
                            editedPet?.microchipNumber
                                ? editedPet.microchipNumber
                                : 0
                        }
                        fullWidth
                        onChange={(event) => {
                            const copy = { ...editedPet };
                            if (event.target.value === "0") {
                                copy.microchipNumber = null;
                            } else {
                                copy.microchipNumber = event.target.value;
                            }
                            setEditedPet(copy);
                        }}
                    />
                    {allergies.map((allergy) => {
                        return (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "nowrap",
                                    alignItems: "center",
                                }}
                                key={allergy.id}
                            >
                                <TextField
                                    key={allergy.id}
                                    margin="dense"
                                    id="allergy"
                                    label="Allergy"
                                    type="text"
                                    value={allergy.thing}
                                    fullWidth
                                    disabled
                                />
                                <IconButton
                                    edge="end"
                                    onClick={(event) => {
                                        removeAllergy(allergy);
                                    }}
                                >
                                    <RemoveCircleIcon />
                                </IconButton>
                            </Box>
                        );
                    })}

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={editedPet?.isFixed}
                                onChange={(event) => {
                                    const copy = { ...editedPet };
                                    copy.isFixed = event.target.checked;
                                    setEditedPet(copy);
                                }}
                            />
                        }
                        label="Is Fixed?"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
