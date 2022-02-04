import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { useParams } from "react-router-dom";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import ContactsRepository from "../../repositories/ContactsRepository";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const Contact = ({
    contact,
    handleChange,
    expanded,
    setMyContacts,
    contactsTypes,
}) => {
    const { resolveResource, resource: currentContact } = useResourceResolver();
    const [editedContact, setEditedContact] = useState({});
    const { contactId } = useParams();
    const { getCurrentUser } = useSimpleAuth();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        resolveResource(contact, contactId, ContactsRepository.getExpandAll);
    }, []);
    useEffect(() => {
        resolveResource(contact, contactId, ContactsRepository.getExpandAll);
    }, [contact]);

    useEffect(() => {
        setEditedContact({
            id: currentContact.id,
            name: currentContact.name,
            phoneNumber: currentContact.phoneNumber,
            addressStreet: currentContact.addressStreet,
            addressCity: currentContact.addressCity,
            addressState: currentContact.addressState,
            addressZipCode: currentContact.addressZipCode,
            contactsTypeId: currentContact.contactsTypeId,
            userId: currentContact.userId,
            starred: currentContact.starred,
        });
    }, [currentContact]);

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...editedContact };
        copy.starred = !editedContact.starred;
        setEditedContact(copy);
        ContactsRepository.editContact(copy);
    };

    const deleteContact = (event) => {
        event.stopPropagation();
        ContactsRepository.delete(parseInt(currentContact.id)).then(() =>
            ContactsRepository.findContactsByUser(getCurrentUser().id).then(
                (data) => setMyContacts(data)
            )
        );
    };

    const editContact = (event) => {
        event.preventDefault();
        handleClose();
        ContactsRepository.editContact(editedContact).then(() =>
            ContactsRepository.findContactsByUser(getCurrentUser().id).then(
                (data) => setMyContacts(data)
            )
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Accordion
                expanded={expanded === `panel${currentContact.id}`}
                onChange={handleChange(`panel${currentContact.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${currentContact.id}-content`}
                    id={`panel${currentContact.id}-header`}
                >
                    <Typography sx={{ width: "15%", flexShrink: 0 }}>
                        {currentContact.contactsType?.type}
                    </Typography>
                    <Typography sx={{ width: "50%", flexShrink: 0 }}>
                        {currentContact.name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", width: "25%"}}>
                        {currentContact.phoneNumber}
                    </Typography>
                    <IconButton onClick={starUnstar} >
                        {editedContact.starred ? (
                            <StarIcon />
                        ) : (
                            <StarBorderIcon />
                        )}
                    </IconButton>
                    <IconButton onClick={deleteContact}>
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {currentContact.addressStreet}
                        {currentContact.addressCity},{" "}
                        {currentContact.addressState}{" "}
                        {currentContact.addressZipCode}
                    </Typography>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
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
                            <InputLabel id="species-label">
                                Contact type
                            </InputLabel>
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
        </>
    );
};
