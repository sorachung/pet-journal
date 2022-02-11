import React, {useState} from "react";
import SchedulingRepository from "../../../repositories/SchedulingRepository";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const EditReminderDialog = ({
    open,
    setOpen,
    syncPetReminders,
    petReminder
}) => {
    const [editedPetReminder, setEditedPetReminder] = useState(petReminder);

    const handleClose = () => {
        setOpen(false);
    };

    const editReminder = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedPetReminder };
        delete copy.pet;
        SchedulingRepository.editReminder(copy).then(() => syncPetReminders());
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editReminder}>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogContent>
                <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            label="date"
                            InputLabelProps={{ shrink: true }}
                            required
                            value={editedPetReminder.date}
                            type="date"
                            onChange={(event) => {
                                const copy = { ...editedPetReminder };
                                copy.date = event.target.value;
                                setEditedPetReminder(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="time"
                            label="time"
                            InputLabelProps={{ shrink: true }}
                            required
                            value={editedPetReminder.time}
                            type="time"
                            onChange={(event) => {
                                const copy = { ...editedPetReminder };
                                copy.time = event.target.value;
                                setEditedPetReminder(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="subject"
                            label="subject"
                            type="text"
                            required
                            value={editedPetReminder.subject}
                            fullWidth
                            onChange={(event) => {
                                const copy = { ...editedPetReminder };
                                copy.subject = event.target.value;
                                setEditedPetReminder(copy);
                            }}
                        />

                        <TextField
                            margin="dense"
                            id="details"
                            label="Details"
                            required
                            type="text"
                            value={editedPetReminder.details}
                            multiline
                            onChange={(event) => {
                                const copy = { ...editedPetReminder };
                                copy.details = event.target.value;
                                setEditedPetReminder(copy);
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
