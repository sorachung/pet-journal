import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ContactsRepository from "../../repositories/ContactsRepository";
import { Contact } from "./Contact";
import { ContactsAddDialog } from "./ContactsAddDialog";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


export const ContactList = () => {
    const [myContacts, setMyContacts] = useState([]);
    const [contactsTypes, setContactsTypes] = useState([]);
    const { getCurrentUser } = useSimpleAuth();
    const [expanded, setExpanded] = useState(false);

    const syncMyContacts = () => {
        ContactsRepository.findContactsByUser(getCurrentUser().id).then(
            (data) => setMyContacts(data)
        );
    };

    useEffect(() => {
        syncMyContacts();
        ContactsRepository.getContactsTypes().then((data) =>
            setContactsTypes(data)
        );
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center" >
                My Contacts
            </Typography>
            <ContactsAddDialog
                userId={getCurrentUser().id}
                syncMyContacts={syncMyContacts}
                contactsTypes={contactsTypes}
            />
            <Box>
                {myContacts.map((contact) => {
                    return (
                        <Contact
                            contact={contact}
                            handleChange={handleChange}
                            expanded={expanded}
                            key={contact.id}
                            syncMyContacts={syncMyContacts}
                            contactsTypes={contactsTypes}
                        />
                    );
                })}
            </Box>
        </Container>
    );
};
