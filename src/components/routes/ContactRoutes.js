import React from "react";
import { Route } from "react-router-dom";
import { Contact } from "../contacts/Contact";
import { ContactList } from "../contacts/ContactList";

export const ContactRoutes = () => {
    return (
        <>
            <Route exact path="/contacts">
                <ContactList />
            </Route>
        </>
    )
}