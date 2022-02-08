import React, { useEffect, useState } from "react";
import NotesRepository from "../../repositories/NotesRepository";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import { EditNoteDialog } from "./EditNoteDialog";

export const Note = ({ note, syncNotes }) => {
    const [open, setOpen] = useState(false);

    const deleteNote = () => [
        NotesRepository.delete(note.id).then(() => syncNotes()),
    ];

    const starUnstar = () => {
        const copy = { ...note };
        copy.starred = !note.starred;
        NotesRepository.editNote(copy).then(() => syncNotes());
    };

    const handleClickOpen = () => {
        setOpen(true);
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
            <EditNoteDialog syncNotes={syncNotes} note={note} open={open} setOpen={setOpen} />
        </Card>
    );
};
