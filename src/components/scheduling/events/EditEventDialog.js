import React, {useState} from "react";
import SchedulingRepository from "../../../repositories/SchedulingRepository";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const EditEventDialog = ({
    open,
    setOpen,
    syncPetEvents,
    petEvent
}) => {
    const [editedPetEvent, setEditedPetEvent] = useState(petEvent);
    const handleClose = () => {
        setOpen(false);
    };

    const editEvent = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedPetEvent };
        SchedulingRepository.editEvent(copy).then(() => syncPetEvents());
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editEvent}>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogContent>
                <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            label="date"
                            InputLabelProps={{ shrink: true }}
                            required
                            value={editedPetEvent.date}
                            type="date"
                            onChange={(event) => {
                                const copy = { ...editedPetEvent };
                                copy.date = event.target.value;
                                setEditedPetEvent(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="time"
                            label="time"
                            InputLabelProps={{ shrink: true }}
                            required
                            value={editedPetEvent.time}
                            type="time"
                            onChange={(event) => {
                                const copy = { ...editedPetEvent };
                                copy.time = event.target.value;
                                setEditedPetEvent(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="subject"
                            label="subject"
                            type="text"
                            required
                            value={editedPetEvent.subject}
                            fullWidth
                            onChange={(event) => {
                                const copy = { ...editedPetEvent };
                                copy.subject = event.target.value;
                                setEditedPetEvent(copy);
                            }}
                        />

                        <TextField
                            margin="dense"
                            id="details"
                            label="Details"
                            required
                            type="text"
                            value={editedPetEvent.details}
                            multiline
                            onChange={(event) => {
                                const copy = { ...editedPetEvent };
                                copy.details = event.target.value;
                                setEditedPetEvent(copy);
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
