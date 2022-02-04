import React, { useEffect, useState } from "react";
import UserRepository from "../../repositories/UserRepository";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import PetRepository from "../../repositories/PetRepository";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import { ViewMedical } from "../medicals/ViewMedical";
import { PetMedicalBio } from "../medicals/PetMedicalBio"
import { IncidentsList } from "../medicals/IncidentsList"
import { Incident } from "../medicals/Incident";
import { VetVisitsList } from "../medicals/VetVisitsList";
import { VetVisit } from "../medicals/VetVisit";
import { VaccinationsList } from "../medicals/VaccinationsList";
import { MedicationsList } from "../medicals/MedicationsList";

export const MedicalRoutes = () => {
    const [user, updateUser] = useState({});
    const [pet, setPet] = useState({});
    const { getCurrentUser } = useSimpleAuth();
    const history = useHistory()
    
    const syncPet = () => {
        if(user.defaultPetId) {
            PetRepository.getExpandAll(user.defaultPetId).then(
                (data) => {
                    setPet(data);
                }
            );
        }
    };

    const syncUser = () => {
        UserRepository.get(getCurrentUser().id).then((data) => {
            updateUser(data)
        });
    };

    useEffect(() => {
        syncPet()
    },[user])

    useEffect(() => {
        syncUser();
    }, []);

    useEffect(() => {
        UserRepository.get(getCurrentUser().id).then((data) => {
            updateUser(data);
        });
    }, [history.location.state]);

    return (
        <>
            <Route exact path="/medical">
                <ViewMedical pet={pet}/>
            </Route>
            <Route exact path="/medical/bio">
                <PetMedicalBio pet={pet}/>
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