import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Note } from "./Note";
import NotesRepository from "../../repositories/NotesRepository";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AddNoteDialog } from "./AddNoteDialog";

export const NotesList = ({ user, defaultPet }) => {
    const [myPetNotes, setMyPetNotes] = useState([]);
    const [open, setOpen] = useState(false);

    const syncNotes = () => {
        NotesRepository.findNotesByPet(defaultPet?.id).then((data) =>
            setMyPetNotes(data)
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect( () => {
        syncNotes();
    }, [defaultPet])

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center">
                {defaultPet?.name}'s Notes
            </Typography>
            <Typography align="center">
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ marginBottom: "2em" }}
                >
                    Add a note
                </Button>
            </Typography>
            <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                {myPetNotes.map((note) => (
                    <Grid item sm={4} lg={3} key={`note--${note.id}`}>
                        <Note note={note} syncNotes={syncNotes} key={note.id} />
                    </Grid>
                ))}
            </Grid>
            <AddNoteDialog
                open={open}
                setOpen={setOpen}
                user={user}
                syncNotes={syncNotes}
            />
        </Container>
    );
};
