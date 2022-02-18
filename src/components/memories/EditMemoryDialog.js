import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MemoriesRepository from "../../repositories/MemoriesRepository";

export const EditMemoryDialog = ({ open, setOpen, syncMyMemories, memory }) => {
    const [editedMemory, updateEditedMemory] = useState(memory);

    const editMemory = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedMemory };
        copy.timestamp = Date.now();
        delete copy.memoriesTags;
        MemoriesRepository.editMemory(copy).then(() => syncMyMemories());
    };
    const handleClose = () => {
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
