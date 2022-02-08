import React from "react";
import { Route } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { ContactRoutes } from "./routes/ContactRoutes";
import { MedicalRoutes } from "./routes/MedicalRoutes";
import { NoteRoutes } from "./routes/NoteRoutes";
import { PetRoutes } from "./routes/PetRoutes";

export const ApplicationView = ({user, updateUser, pet, myPets, setMyPets, defaultPet}) => {
    return (
        <>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <PetRoutes user={user} updateUser={updateUser} pet={pet} myPets={myPets} setMyPets={setMyPets} />
            <MedicalRoutes />
            <ContactRoutes />
            <NoteRoutes user={user} updateUser={updateUser} defaultPet={defaultPet} />
        </>
    )
}