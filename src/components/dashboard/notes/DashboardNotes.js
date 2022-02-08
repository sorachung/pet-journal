import React, { useEffect, useState } from "react";
import NotesRepository from "../../../repositories/NotesRepository";
import { Note } from "../../notes/Note";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export const DashboardNotes = ({ user }) => {
    const [myPetNotes, setMyPetNotes] = useState([]);
    

    const syncNotes = () => {
        NotesRepository.findNotesByUser(user.id)
            .then(data => setMyPetNotes(data))
    }

    useEffect(() => {
        syncNotes();
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" gutterBottom align="center">
                Notes
            </Typography>
            <Box sx={{ textAlign: "center" }}>
                <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                    {myPetNotes.map((note) => (
                        <Grid item sm={4} lg={3} key={`note--${note.id}`}>
                            <Note
                                note={note}
                                syncNotes={syncNotes}
                                key={note.id}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};
