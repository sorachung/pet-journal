import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { ViewMedical } from "../medicals/ViewMedical";
import { PetMedicalBio } from "../medicals/bio/PetMedicalBio"
import { IncidentsList } from "../medicals/incidents/IncidentsList"
import { VetVisitsList } from "../medicals/vetVisits/VetVisitsList";
import { VaccinationsList } from "../medicals/vaccinations/VaccinationsList";
import { MedicationsList } from "../medicals/medications/MedicationsList";

export const MedicalRoutes = ({pet, syncPets}) => {

    return (
        <>
            <Route exact path="/medical">
                <ViewMedical pet={pet} syncPets={syncPets}/>
            </Route>
            <Route exact path="/medical/bio">
                <PetMedicalBio pet={pet} syncPets={syncPets}/>
            </Route>
            <Route exact path="/medical/incidents">
                <IncidentsList pet={pet}/>
            </Route>
            <Route exact path="/medical/vetvisits">
                <VetVisitsList pet={pet}/>
            </Route>
            <Route exact path="/medical/vaccinations">
                <VaccinationsList pet={pet}/>
            </Route>
            <Route exact path="/medical/medications">
                <MedicationsList pet={pet}/>
            </Route>
        </>
    )
}