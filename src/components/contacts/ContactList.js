import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ContactsRepository from "../../repositories/ContactsRepository";
import { Contact } from "./Contact";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
import { useHistory } from "react-router-dom";

export const ContactList = ({dashboardView}) => {
    const [myContacts, setMyContacts] = useState([]);
    const [contactsTypes, setContactsTypes] = useState([]);
    const { getCurrentUser } = useSimpleAuth();
    const [newContact, setNewContact] = useState({
        contactsTypeId: "",
        userId: getCurrentUser().id,
        starred: false,
    });
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const history = useHistory(); 

    useEffect(() => {
        ContactsRepository.findContactsByUser(getCurrentUser().id).then(
            (data) => {
                if (dashboardView) {
                    setMyContacts(data.filter(contact => contact.starred))
                } else {
                    setMyContacts(data)
                }
            }
        );
        ContactsRepository.getContactsTypes().then((data) =>
            setContactsTypes(data)
        );
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const addContact = () => {
        ContactsRepository.addContact(newContact).then(() =>
            ContactsRepository.findContactsByUser(getCurrentUser().id).then(
                (data) => setMyContacts(data)
            )
        );
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                My Contacts
            </Typography>
            {history.location.pathname === "/" ? (
                ""
            ) : (
                <Button variant="contained" onClick={handleClickOpen}>
                    Add Contact
                </Button>
            )}
            <Dialog open={open} onClose={handleClose}>
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
                        <InputLabel id="species-label">Contact type</InputLabel>
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
                    <Button
                        onClick={() => {
                            handleClose();
                            addContact();
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Box>
                {myContacts.map((contact) => {
                    return (
                        <Contact
                            contact={contact}
                            handleChange={handleChange}
                            expanded={expanded}
                            key={contact.id}
                            setMyContacts={setMyContacts}
                            contactsTypes={contactsTypes}
                        />
                    );
                })}
            </Box>
        </Container>
    );
};
