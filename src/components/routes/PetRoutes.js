import React from "react";
import { Route } from "react-router-dom";
import { PetsList } from "../pets/PetsList";

export const PetRoutes = ({user, updateUser, pet, myPets, setMyPets}) => {
    return (
        <>
            <Route exact path="/mypets">
                <PetsList user={user} updateUser={updateUser} myPets={myPets} setMyPets={setMyPets}/>
            </Route>
        </>
    )
}