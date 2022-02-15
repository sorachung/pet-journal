import React from "react";
import { Route } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { ContactRoutes } from "./routes/ContactRoutes";
import { MedicalRoutes } from "./routes/MedicalRoutes";
import { MemoryRoutes } from "./routes/MemoryRoutes";
import { NoteRoutes } from "./routes/NoteRoutes";
import { PetRoutes } from "./routes/PetRoutes";
import { SchedulingRoutes } from "./routes/SchedulingRoutes";

export const ApplicationView = ({user, updateUser, pet, myPets, setMyPets, defaultPet, syncPets}) => {
    return (
        <>
            <Route exact path="/">
                <Dashboard user={user} myPets={myPets} syncPets={syncPets}/>
            </Route>
            <PetRoutes user={user} updateUser={updateUser} pet={pet} myPets={myPets} setMyPets={setMyPets} />
            <MedicalRoutes pet={defaultPet} syncPets={syncPets}/>
            <ContactRoutes />
            <NoteRoutes user={user} defaultPet={defaultPet} />
            <SchedulingRoutes pet={pet}/>
            <MemoryRoutes user={user} defaultPet={defaultPet} myPets={myPets} />
        </>
    )
}