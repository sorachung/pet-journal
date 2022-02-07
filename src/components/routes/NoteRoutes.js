import React from "react";
import { Route } from "react-router-dom";
import { NotesList } from "../notes/NotesList";

export const NoteRoutes = () => {
    return (
        <>
            <Route exact path="/notes">
                <NotesList />
            </Route>
        </>
    )
}