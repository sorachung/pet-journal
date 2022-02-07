import React, { useEffect, useState } from "react";
import NotesRepository from "../../repositories/NotesRepository";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";

export const Note = ({ note, syncNotes }) => {
    const [editedNote, updateEditedNote] = useState(note);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        updateEditedNote(note)
    }, [note])

    const deleteNote = () => [
        NotesRepository.delete(note.id).then(() => syncNotes()),
    ];
    const noteDateTime = new Date(note.timestamp).toLocaleString();

    const editNote = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedNote };
        copy.timestamp = Date.now();
        NotesRepository.editNote(copy).then(() => syncNotes());
    };

    const starUnstar = (event) => {
        const copy = { ...editedNote };
        copy.starred = !editedNote.starred;
        NotesRepository.editNote(copy).then(() => syncNotes());
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{ minWidth: 200 }}>
            <CardContent>
                <Typography gutterBottom variant="h2" fontSize="1.5em">
                    {note.subject}
                </Typography>
                <Typography variant="body1">{note.textBody}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {new Date(note.timestamp).toLocaleString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleClickOpen}>
                    Edit
                </Button>
                <Button size="small" onClick={deleteNote}>
                    Delete
                </Button>
                <IconButton onClick={starUnstar}>
                    {note.starred ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
            </CardActions>
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
        </Card>
    );
};
