import React from "react";
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

export const ContactEditDialog = ({
    open,
    setOpen,
    contactsTypes,
    syncMyContacts,
    editedContact,
    setEditedContact,
}) => {
    const handleClose = () => {
        setOpen(false);
    };

    const editContact = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedContact };
        delete copy.contactsType;
        ContactsRepository.editContact(copy).then(() => syncMyContacts());
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editContact}>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        required
                        value={editedContact.name}
                        fullWidth
                        onChange={(event) => {
                            const copy = { ...editedContact };
                            copy.name = event.target.value;
                            setEditedContact(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        required
                        value={editedContact.phoneNumber}
                        fullWidth
                        onChange={(event) => {
                            const copy = { ...editedContact };
                            copy.phoneNumber = event.target.value;
                            setEditedContact(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="street"
                        label="Street Address"
                        type="text"
                        value={editedContact.addressStreet}
                        required
                        fullWidth
                        onChange={(event) => {
                            const copy = { ...editedContact };
                            copy.addressStreet = event.target.value;
                            setEditedContact(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="city"
                        label="City"
                        value={editedContact.addressCity}
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedContact };
                            copy.addressCity = event.target.value;
                            setEditedContact(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="state"
                        label="State"
                        value={editedContact.addressState}
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedContact };
                            copy.addressState = event.target.value;
                            setEditedContact(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="zipCode"
                        label="Zip Code"
                        value={editedContact.addressZipCode}
                        required
                        type="number"
                        onChange={(event) => {
                            const copy = { ...editedContact };
                            copy.addressZipCode = event.target.value;
                            setEditedContact(copy);
                        }}
                    />
                    <FormControl required sx={{ m: 1, minWidth: 225 }}>
                        <InputLabel id="species-label">Contact type</InputLabel>
                        <Select
                            labelId="contact-type-label"
                            id="contact-type"
                            value={editedContact.contactsTypeId}
                            label="contact-type"
                            onChange={(event) => {
                                const copy = { ...editedContact };
                                copy.contactsTypeId = parseInt(
                                    event.target.value
                                );
                                setEditedContact(copy);
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
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
