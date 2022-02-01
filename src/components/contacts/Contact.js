import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useResourceResolver from "../../hooks/resource/useResourceResolver";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactsRepository from "../../repositories/ContactsRepository";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";

export const Contact = ({ contact, handleChange, expanded }) => {
    const { resolveResource, resource: currentContact } = useResourceResolver();
    const [editedContact, setEditedContact] = useState({});
    const { contactId } = useParams();

    useEffect(() => {
        resolveResource(contact, contactId, ContactsRepository.getExpandAll);
    }, []);

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

    const starUnstar = () => {
        const copy = {...editedContact}
        copy.starred = !editedContact.starred;
        setEditedContact(copy);
        ContactsRepository.editContact(copy);
    };

    return (
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
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {currentContact.name}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                    {currentContact.phoneNumber}
                </Typography>
                <IconButton onClick={starUnstar}>
                    {editedContact.starred ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {currentContact.addressStreet}
                    {currentContact.addressCity}, {currentContact.addressState}{" "}
                    {currentContact.addressZipCode}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};
