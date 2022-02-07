import React from "react";
import { Route } from "react-router-dom";
import { PetsList } from "../pets/PetsList";

export const PetRoutes = () => {
    return (
        <>
            <Route exact path="/mypets">
                <PetsList />
            </Route>
        </>
    )
}