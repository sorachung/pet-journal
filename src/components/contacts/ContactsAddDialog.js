import React, { useState } from "react";
import ContactsRepository from "../../repositories/ContactsRepository";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export const ContactsAddDialog = ({
    userId,
    syncMyContacts,
    contactsTypes,
}) => {
    const [newContact, setNewContact] = useState({
        contactsTypeId: "",
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

    const addContact = (event) => {
        event.preventDefault();
        handleClose();
        ContactsRepository.addContact(newContact).then(() => syncMyContacts());
    };

    return (
        <>
            <Typography align="center">
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ marginBottom: "2em" }}
                >
                    Add Contact
                </Button>
            </Typography>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={addContact}>
                    <DialogTitle>Add Contact</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            required
                            fullWidth
                            onChange={(event) => {
                                const copy = { ...newContact };
                                copy.name = event.target.value;
                                setNewContact(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Phone Number"
                            type="tel"
                            required
                            fullWidth
                            onChange={(event) => {
                                const copy = { ...newContact };
                                copy.phoneNumber = event.target.value;
                                setNewContact(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="street"
                            label="Street Address"
                            type="text"
                            required
                            fullWidth
                            onChange={(event) => {
                                const copy = { ...newContact };
                                copy.addressStreet = event.target.value;
                                setNewContact(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="city"
                            label="City"
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...newContact };
                                copy.addressCity = event.target.value;
                                setNewContact(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="state"
                            label="State"
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...newContact };
                                copy.addressState = event.target.value;
                                setNewContact(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="zipCode"
                            label="Zip Code"
                            required
                            type="number"
                            onChange={(event) => {
                                const copy = { ...newContact };
                                copy.addressZipCode = event.target.value;
                                setNewContact(copy);
                            }}
                        />
                        <FormControl required sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel id="species-label">
                                Contact type
                            </InputLabel>
                            <Select
                                labelId="contact-type-label"
                                id="contact-type"
                                value={newContact.contactsTypeId}
                                label="contact-type"
                                onChange={(event) => {
                                    const copy = { ...newContact };
                                    copy.contactsTypeId = parseInt(
                                        event.target.value
                                    );
                                    setNewContact(copy);
                                }}
                            >
                                {contactsTypes.map((contactType) => (
                                    <MenuItem
                                        key={`contactType--${contactType.id}`}
                                        value={contactType.id}
                                    >
                                        {contactType.type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
