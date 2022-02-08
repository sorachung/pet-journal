import React, { useState } from "react";
import NotesRepository from "../../repositories/NotesRepository";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export const AddNoteDialog = ({ open, setOpen, user, syncNotes }) => {
    const [newNote, setNewNote] = useState({});

    const addNote = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...newNote };
        copy.starred = false;
        copy.userId = user.id;
        copy.petId = user.defaultPetId;
        copy.timestamp = Date.now();
        NotesRepository.addNote(copy).then(() => syncNotes());
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={addNote}>
                <DialogTitle>Add Note</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="subject"
                        label="subject"
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...newNote };
                            copy.subject = event.target.value;
                            setNewNote(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="textBody"
                        label="textBody"
                        required
                        multiline
                        type="text"
                        onChange={(event) => {
                            const copy = { ...newNote };
                            copy.textBody = event.target.value;
                            setNewNote(copy);
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
