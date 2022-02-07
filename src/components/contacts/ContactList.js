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
import { ContactsAddDialog } from "./ContactsAddDialog";

export const ContactList = ({ dashboardView }) => {
    const [myContacts, setMyContacts] = useState([]);
    const [contactsTypes, setContactsTypes] = useState([]);
    const { getCurrentUser } = useSimpleAuth();
    const [expanded, setExpanded] = useState(false);
    const history = useHistory();

    useEffect(() => {
        ContactsRepository.findContactsByUser(getCurrentUser().id).then(
            (data) => {
                if (dashboardView) {
                    setMyContacts(data.filter((contact) => contact.starred));
                } else {
                    setMyContacts(data);
                }
            }
        );
        ContactsRepository.getContactsTypes().then((data) =>
            setContactsTypes(data)
        );
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                My Contacts
            </Typography>
            <ContactsAddDialog
                userId={getCurrentUser().id}
                setMyContacts={setMyContacts}
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
                            setMyContacts={setMyContacts}
                            contactsTypes={contactsTypes}
                        />
                    );
                })}
            </Box>
        </Container>
    );
};
