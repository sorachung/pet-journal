import React from "react";
import { PetMedicalBio } from "./bio/PetMedicalBio";
import { IncidentsList } from "./incidents/IncidentsList";
import { VetVisitsList } from "./VetVisitsList";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MedicationsList } from "./medications/MedicationsList";
import { VaccinationsList } from "./vaccinations/VaccinationsList";

export const ViewMedical = ({pet, syncPets}) => {

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                {pet ? pet.name + "'s " : ""} Medical
            </Typography>
            {(pet) ?
                <Grid container spacing={8} direction="column">
                    <Grid item xs={12} key={`medicalBio`}>
                        <PetMedicalBio pet={pet} syncPets={syncPets}/>
                    </Grid>
                    
                    <Grid item xs={12} key={`medications`}>
                        <MedicationsList pet={pet} />
                    </Grid>
                    <Grid item xs={12} key={`incidentsList`}>
                        <IncidentsList pet={pet} />
                    </Grid>
                    <Grid item xs={12} key={`vetVisitsList`}>
                        <VetVisitsList pet={pet} />
                    </Grid>
                    <Grid item xs={12} key={`vaccinations`}>
                        <VaccinationsList pet={pet} />
                    </Grid>
                </Grid>
            : ""}
        </Container>
    );
};
