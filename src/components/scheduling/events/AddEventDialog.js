import React, { useState } from "react";
import SchedulingRepository from "../../../repositories/SchedulingRepository";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

export const AddEventDialog = ({ pet, userId, syncPetEvents }) => {
    const [newEvent, setNewEvent] = useState({
        userId: userId,
        starred: false,
    });
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const addEvent = (event) => {
        event.preventDefault();
        handleClose();
        const copy = {...newEvent}
        copy.petId = pet.id
        SchedulingRepository.addEvent(copy).then(() => syncPetEvents());
    };

    return (
        <>
            <Typography align="center">
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ marginBottom: "2em" }}
                >
                    Add Event
                </Button>
            </Typography>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={addEvent}>
                    <DialogTitle>Add Event</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            label="date"
                            InputLabelProps={{ shrink: true }}
                            required
                            type="date"
                            onChange={(event) => {
                                const copy = { ...newEvent };
                                copy.date = event.target.value;
                                setNewEvent(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="time"
                            label="time"
                            InputLabelProps={{ shrink: true }}
                            required
                            type="time"
                            onChange={(event) => {
                                const copy = { ...newEvent };
                                copy.time = event.target.value;
                                setNewEvent(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="subject"
                            label="subject"
                            type="text"
                            required
                            fullWidth
                            onChange={(event) => {
                                const copy = { ...newEvent };
                                copy.subject = event.target.value;
                                setNewEvent(copy);
                            }}
                        />

                        <TextField
                            margin="dense"
                            id="details"
                            label="Details"
                            required
                            type="text"
                            multiline
                            onChange={(event) => {
                                const copy = { ...newEvent };
                                copy.details = event.target.value;
                                setNewEvent(copy);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
