import React from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NotesRepository from "../../repositories/NotesRepository";

export const Note = ({note, syncNotes}) => {

    const editNote = () => {

    }

    const deleteNote = () => [
        NotesRepository.delete(note.id)
            .then(() => syncNotes())
    ]
    const noteDateTime = new Date(note.timestamp).toLocaleString()

    return (
        <Card sx={{ minWidth: 200 }}>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h2"
                        fontSize="1.5em"
                    >
                        {note.subject}
                    </Typography>
                    <Typography variant="body1">
                        {note.textBody}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {new Date(note.timestamp).toLocaleString()}
                    </Typography>
                </CardContent>
                <CardActions>
                        <Button size="small" onClick={editNote}>
                            Edit
                        </Button>
                        <Button size="small" onClick={() => deleteNote}>
                            Delete
                        </Button>
                </CardActions>
            </Card>
    )
}