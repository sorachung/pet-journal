import React, { useState, useEffect } from "react";
import ContactsRepository from "../../../repositories/ContactsRepository";
import { Contact } from "../../contacts/Contact";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const DashboardContacts = ({ user }) => {
    const [myContacts, setMyContacts] = useState([]);
    const [contactsTypes, setContactsTypes] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncMyContacts = () => {
        ContactsRepository.findStarredContactsByUser(user.id).then((data) =>
            setMyContacts(data)
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
            <Typography variant="h5" gutterBottom align="center">
                My Contacts
            </Typography>
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
