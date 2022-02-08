import React, { useState } from "react";
import NotesRepository from "../../repositories/NotesRepository";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export const EditNoteDialog = ({ open, setOpen, syncNotes, note }) => {
    const [editedNote, updateEditedNote] = useState(note);

    const editNote = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedNote };
        copy.timestamp = Date.now();
        NotesRepository.editNote(copy).then(() => syncNotes());
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editNote}>
                <DialogTitle>Add Note</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="subject"
                        label="subject"
                        required
                        value={editedNote.subject}
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedNote };
                            copy.subject = event.target.value;
                            updateEditedNote(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="textBody"
                        label="textBody"
                        required
                        value={editedNote.textBody}
                        multiline
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedNote };
                            copy.textBody = event.target.value;
                            updateEditedNote(copy);
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
