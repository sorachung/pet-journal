import React from "react";
import { Route } from "react-router-dom";
import { AddPetForm } from "../pets/AddPetForm";
import { EditPetForm } from "../pets/EditPetForm";
import { Pet } from "../pets/Pet";
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