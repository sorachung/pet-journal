import React from "react";
import { Route } from "react-router-dom";
import { NotesList } from "../notes/NotesList";

export const NoteRoutes = ({user, updateUser, defaultPet}) => {
    return (
        <>
            <Route exact path="/notes">
                <NotesList user={user} updateUser={updateUser} defaultPet={defaultPet} />
            </Route>
        </>
    )
}