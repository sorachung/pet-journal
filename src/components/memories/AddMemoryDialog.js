import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import MemoriesRepository from "../../repositories/MemoriesRepository";

export const AddMemoryDialog = ({ syncMyMemories, myPets, userId }) => {
    const [newMemory, updateNewMemory] = useState({});
    const [newTagPetIds, updateNewTagPetIds] = useState([]);
    const [open, setOpen] = useState(false);

    const addMemory = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...newMemory };
        copy.timestamp = Date.now();
        copy.userId = userId;
        copy.starred = false;
        MemoriesRepository.addMemory(copy).then((data) => {
            const newMemoryTags = newTagPetIds.map((petId) => ({
                memoryId: data.id,
                petId: petId,
            }));
            Promise.all(
                newMemoryTags.map((tag) => MemoriesRepository.addTag(tag))
            ).then(() => {
                syncMyMemories();
                updateNewTagPetIds([]);
            });
        });
    };
    const handleClose = () => {
        updateNewMemory({});
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
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
                const copy = { ...newMemory };
                copy.photoURL = data.url;
                updateNewMemory(copy);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Typography align="center">
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ marginBottom: "2em" }}
                >
                    Add a memory
                </Button>
            </Typography>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={addMemory}>
                    <DialogTitle>Add Memory</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2}>
                            {newMemory.photoURL ? (
                                <img
                                    src={newMemory.photoURL}
                                    style={{ maxWidth: "100%" }}
                                />
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
                            <TextField
                                margin="dense"
                                id="title"
                                label="Title"
                                required
                                type="text"
                                onChange={(event) => {
                                    const copy = { ...newMemory };
                                    copy.title = event.target.value;
                                    updateNewMemory(copy);
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="bodyText"
                                label="caption"
                                required
                                multiline
                                type="text"
                                onChange={(event) => {
                                    const copy = { ...newMemory };
                                    copy.bodyText = event.target.value;
                                    updateNewMemory(copy);
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
                                                    onChange={() => {
                                                        const copy =
                                                            newTagPetIds;
                                                        if (
                                                            copy.includes(
                                                                pet.id
                                                            )
                                                        ) {
                                                            const copyUncheck =
                                                                copy.filter(
                                                                    (petId) =>
                                                                        petId !==
                                                                        pet.id
                                                                );
                                                            updateNewTagPetIds(
                                                                copyUncheck
                                                            );
                                                        } else {
                                                            copy.push(pet.id);
                                                            updateNewTagPetIds(
                                                                copy
                                                            );
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
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
