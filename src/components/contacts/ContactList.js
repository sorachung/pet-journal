import React, { useState, useEffect }  from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { useHistory } from "react-router-dom";
import ContactsRepository from "../../repositories/ContactsRepository";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Contact } from "./Contact";

export const ContactList = () => {
    const [myContacts, setMyContacts] = useState([]);
    const { getCurrentUser } = useSimpleAuth();
    const history = useHistory();
    const [expanded, setExpanded] = useState(false);


    useEffect( () => {
        ContactsRepository.findContactsByUser(getCurrentUser().id)
            .then(data => setMyContacts(data));
    }, [])


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
                <Typography variant="h1" gutterBottom align="center" fontSize="3em" >
                My Contacts
            </Typography>
            <Box>
                {myContacts.map(contact => {
                    return <Contact contact={contact} handleChange={handleChange} expanded={expanded} key={contact.id}/>
                })}
            </Box>
        </Container>
    )
}