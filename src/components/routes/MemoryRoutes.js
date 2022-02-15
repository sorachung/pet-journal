import React from "react";
import { Route } from "react-router-dom";
import { MemoriesList } from "../memories/MemoriesList";

export const MemoryRoutes = ({user, defaultPet, myPets}) => {
    return (
        <>
            <Route exact path="/memories">
                <MemoriesList user={user} defaultPet={defaultPet} myPets={myPets}/>
            </Route>
        </>
    )
}