import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MemoriesRepository from "../../repositories/MemoriesRepository";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const EditMemoryDialog = ({
    open,
    setOpen,
    syncMyMemories,
    memory,
    tags,
    syncTags,
    myPets,
}) => {
    const [editedMemory, updateEditedMemory] = useState(memory);
    const [editedTagPetIds, updateEditedTagPetIds] = useState([]);

    useEffect(() => {
        updateEditedTagPetIds(tags.map((tag) => tag.petId));
    }, [tags]);

    const editMemory = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedMemory };
        copy.timestamp = Date.now();
        delete copy.memoriesTags;
        MemoriesRepository.editMemory(copy).then(() => {
            const copyOfTags = tags.map((tag) => ({ ...tag }));

            const tagsToRemove = copyOfTags.filter(
                (tag) => !editedTagPetIds.find((petId) => petId === tag.petId)
            );

            const petIdTagsToAdd = editedTagPetIds.filter((petId) =>
                !copyOfTags.find((tag) => tag.petId === petId)
            );

            Promise.all(
                tagsToRemove.map((tag) => MemoriesRepository.deleteTags(tag.id))
            ).then(() =>
                Promise.all(
                    petIdTagsToAdd.map((petId) =>
                        MemoriesRepository.addTag({
                            petId: petId,
                            memoryId: memory.id,
                        })
                    )
                ).then(() => {
                    syncMyMemories();
                    syncTags();
                })
            );
        });
    };
    const handleClose = () => {
        updateEditedTagPetIds(tags.map((tag) => tag.petId));
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editMemory}>
                <DialogTitle>Add Memory</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="title"
                        label="Title"
                        required
                        value={editedMemory.title}
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedMemory };
                            copy.title = event.target.value;
                            updateEditedMemory(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="bodyText"
                        label="caption"
                        required
                        value={editedMemory.bodyText}
                        multiline
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedMemory };
                            copy.bodyText = event.target.value;
                            updateEditedMemory(copy);
                        }}
                    />
                    <FormControl
                        required
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                    >
                        <FormLabel component="legend">
                            Pick at least one
                        </FormLabel>
                        <FormGroup>
                            {myPets.map((pet) => (
                                <FormControlLabel
                                    key={pet.id}
                                    control={
                                        <Checkbox
                                            checked={
                                                editedTagPetIds.includes(pet.id)
                                                    ? true
                                                    : false
                                            }
                                            onChange={() => {
                                                const copy = [
                                                    ...editedTagPetIds,
                                                ];
                                                if (copy.includes(pet.id)) {
                                                    const copyRemoved =
                                                        copy.filter(
                                                            (petId) =>
                                                                petId !== pet.id
                                                        );
                                                    updateEditedTagPetIds(
                                                        copyRemoved
                                                    );
                                                } else {
                                                    copy.push(pet.id);
                                                    updateEditedTagPetIds(copy);
                                                }
                                            }}
                                            name={pet.name}
                                        />
                                    }
                                    label={pet.name}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
