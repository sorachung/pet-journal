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
            <Route exact path="/mypets/:petId(\d+)">
                <Pet />
            </Route>
            <Route path="/mypets/:petId(\d+)/edit">
                <EditPetForm />
            </Route>
            <Route exact path="/mypets/add">
                <AddPetForm />
            </Route>


        </>
    )
}