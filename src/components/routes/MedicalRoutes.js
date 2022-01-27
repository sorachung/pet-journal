import React from "react";
import { Route } from "react-router-dom";
import { ViewMedical } from "../medicals/ViewMedical";
import { PetMedicalBio } from "../medicals/PetMedicalBio"
import { IncidentsList } from "../medicals/IncidentsList"
import { Incident } from "../medicals/Incident";
import { VetVisitsList } from "../medicals/VetVisitsList";
import { VetVisit } from "../medicals/VetVisit";

export const MedicalRoutes = () => {
    return (
        <>
            <Route exact path="/medical">
                <ViewMedical />
            </Route>
            <Route path="/medical/bio">
                <PetMedicalBio />
            </Route>
            <Route path="/medical/incidents ">
                <IncidentsList />
            </Route>
            <Route path="/medical/incidents/:incidentId(\d+)">
                <Incident />
            </Route>
            <Route path="/medical/vetvisits ">
                <VetVisitsList />
            </Route>
            <Route path="/medical/vetvisits/:vetVisitId(\d+)">
                <VetVisit />
            </Route>
       


        </>
    )
}