import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Note } from "./Note";
import PetRepository from "../../repositories/PetRepository";
import UserRepository from "../../repositories/UserRepository";
import NotesRepository from "../../repositories/NotesRepository";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export const NotesList = () => {
    const [myPetNotes, setMyPetNotes] = useState([]);
    const [newNote, setNewNote] = useState({})
    const [user, updateUser] = useState({});
    const [myPets, setMyPets] = useState([]);
    const [defaultPet, setDefaultPet] = useState({});
    const { getCurrentUser } = useSimpleAuth();
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const syncPets = () => {
        PetRepository.getAllExpandAllByUser(getCurrentUser().id).then(
            (data) => {
                data.sort((el1) => {
                    if (el1.id === user.defaultPetId) {
                        return -1;
                    }
                });
                setMyPets(data);
            }
        );
    };

    const syncNotes = () => {
        NotesRepository.findNotesByPet(user.defaultPetId)
            .then(data => setMyPetNotes(data))
    }

    const syncUser = () => {
        UserRepository.get(getCurrentUser().id).then((data) => {
            updateUser(data);
        });
    };

    useEffect(() => {
        syncUser();
    }, []);

    useEffect(() => {
        syncPets();
        syncNotes();
    }, [user]);

    useEffect(() => {
        setDefaultPet(myPets.find((pet) => user.defaultPetId === pet.id));
        return () => {
            setDefaultPet({});
        };
    }, [myPets]);

    useEffect(() => {
        
    }, [defaultPet])

    useEffect(() => {
        syncUser();
        return () => {
            syncUser({});
        };
    }, [history.location.state]);

    const addNote = (event) => {
        event.preventDefault();
        handleClose();
        const copy = {...newNote};
        copy.starred = false;
        copy.userId = user.id;
        copy.petId = user.defaultPetId;
        copy.timestamp = Date.now();
        NotesRepository.addNote(copy)
            .then(() => syncNotes())
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
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
                        <Note note={note} syncNotes={syncNotes} key={note.id}/>
                    </Grid>
                ))}
            </Grid>
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
        </Container>
    );
};
