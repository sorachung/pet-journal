import React from "react";
import { Route } from "react-router-dom";
import { NotesList } from "../notes/NotesList";

export const NoteRoutes = ({user, defaultPet}) => {
    return (
        <>
            <Route exact path="/notes">
                <NotesList user={user} defaultPet={defaultPet} />
            </Route>
        </>
    )
}