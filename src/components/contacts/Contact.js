import React, { useState } from "react";
import ContactsRepository from "../../repositories/ContactsRepository";
import { ContactEditDialog } from "./ContactEditDialog";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const Contact = ({
    contact,
    handleChange,
    expanded,
    syncMyContacts,
    contactsTypes,
}) => {
    const [editedContact, setEditedContact] = useState(contact);
    const [open, setOpen] = useState(false);

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...editedContact };
        copy.starred = !contact.starred;
        delete copy.contactsType;
        ContactsRepository.editContact(copy).then(() => syncMyContacts());
    };

    const deleteContact = (event) => {
        event.stopPropagation();
        ContactsRepository.delete(parseInt(contact.id)).then(() =>
            syncMyContacts()
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Accordion
                expanded={expanded === `panel${contact.id}`}
                onChange={handleChange(`panel${contact.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${contact.id}-content`}
                    id={`panel${contact.id}-header`}
                    sx={{
                        ".MuiAccordionSummary-content": {
                            justifyContent: "space-between",
                        },
                    }}
                >
                    <Typography sx={{ flexBasis: "20%", flexShrink: 0 }}>
                        {contact.contactsType?.type}
                    </Typography>
                    <Typography sx={{ width: "50%", flexShrink: 1 }}>
                        {contact.name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", flexShrink: 0, flexBasis: "20%" }}>
                        {contact.phoneNumber}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "no-wrap",
                            flexBasis: "10%",
                        }}
                    >
                        <IconButton onClick={starUnstar}>
                            {contact.starred ? (
                                <StarIcon />
                            ) : (
                                <StarBorderIcon />
                            )}
                        </IconButton>
                        <IconButton onClick={deleteContact}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {contact.addressStreet}
                        {contact.addressCity}, {contact.addressState}{" "}
                        {contact.addressZipCode}
                    </Typography>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>

            <ContactEditDialog
                open={open}
                setOpen={setOpen}
                contact={contact}
                contactsTypes={contactsTypes}
                syncMyContacts={syncMyContacts}
                editedContact={editedContact}
                setEditedContact={setEditedContact}
            />
        </>
    );
};
