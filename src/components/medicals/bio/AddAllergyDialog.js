import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MedicalRepository from "../../../repositories/MedicalRepository";

export const AddAllergyDialog = ({
    openAllergy,
    setOpenAllergy,
    pet,
    syncAllergies,
}) => {
    const [newAllergy, setNewAllergy] = useState({});

    const addAllergy = (event) => {
        event.preventDefault();
        handleCloseAllergy();
        const copy = { ...newAllergy };
        copy.petId = pet.id
        MedicalRepository.addPetAllergy(copy).then((data) =>
            syncAllergies()
        )
    };

    const handleCloseAllergy = () => {
        setOpenAllergy(false);
    };

    return (
        <Dialog open={openAllergy} onClose={handleCloseAllergy}>
            <form onSubmit={addAllergy}>
                <DialogTitle>Edit Bio</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="allergy"
                        label="New allergy"
                        type="text"
                        required
                        fullWidth
                        onChange={(event) => {
                            const copy = { ...newAllergy };
                            copy.thing = event.target.value;
                            setNewAllergy(copy);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAllergy}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
