import Settings from "./Settings";
import { fetchIt } from "./Fetch";
import ContactsRepository from "./ContactsRepository";

const expandVetInVetVisits = (vetVisits) => {
    if (vetVisits.length > 0) {
        const promiseArray = [];
        vetVisits.forEach((vetVisit) => {
            promiseArray.push(ContactsRepository.get(vetVisit.vetId));
        });
        return Promise.all(promiseArray).then((dataArr) => {
            for (let i = 0; i < vetVisits.length; i++) {
                vetVisits[i].vet = dataArr[i];
            }
            return vetVisits;
        });
    } else {
        return vetVisits
    }
};

export default {
    // vaccinations
    async getVaccination(id) {
        return await fetchIt(`${Settings.remoteURL}/vaccinations/${id}`);
    },
    async getAllVaccinations() {
        return await fetchIt(`${Settings.remoteURL}/vaccinations`);
    },

    async getPetVaccinationsByPet(petId) {
        return await fetchIt(
            `${Settings.remoteURL}/petVaccinations?petId=${petId}&_expand=vaccination&_expand=pet`
        );
    },
    async addPetVaccination(petVaccination) {
        return await fetchIt(
            `${Settings.remoteURL}/petVaccinations`,
            "POST",
            JSON.stringify(petVaccination)
        );
    },
    async editPetVaccination(petVaccination) {
        return await fetchIt(
            `${Settings.remoteURL}/petVaccinations/${petVaccination.id}`,
            "PUT",
            JSON.stringify(petVaccination)
        );
    },
    async deletePetVaccination(id) {
        return await fetchIt(
            `${Settings.remoteURL}/petVaccinations/${id}`,
            "DELETE"
        );
    },

    // medications
    async getPetMedication(id) {
        return await fetchIt(
            `${Settings.remoteURL}/petMedications/${id}?_expand=pet&_embed=vetvisits`
        );
    },
    async getAllPetMedications() {
        return await fetchIt(
            `${Settings.remoteURL}/petMedications?_expand=pet&_embed=vetvisits`
        );
    },
    async getMedicationsByPet(petId) {
        return await fetchIt(
            `${Settings.remoteURL}/petMedications?petId=${petId}&_expand=pet`
        );
    },
    async addPetMedication(petMedication) {
        return await fetchIt(
            `${Settings.remoteURL}/petMedications`,
            "POST",
            JSON.stringify(petMedication)
        );
    },
    async editPetMedication(petMedication) {
        return await fetchIt(
            `${Settings.remoteURL}/petMedications/${petMedication.id}`,
            "PUT",
            JSON.stringify(petMedication)
        );
    },
    async deletePetMedication(id) {
        return await fetchIt(
            `${Settings.remoteURL}/petMedications/${id}`,
            "DELETE"
        );
    },

    //allergies
    async getPetAllergy(id) {
        return await fetchIt(
            `${Settings.remoteURL}/petAllergies/${id}?_expand=pet`
        );
    },
    async getPetAllergiesByPet(petId) {
        return await fetchIt(
            `${Settings.remoteURL}/petAllergies?petId=${petId}`
        );
    },
    async getAllPetAllergies() {
        return await fetchIt(`${Settings.remoteURL}/petAllergies?_expand=pet`);
    },
    async addPetAllergy(petAllergy) {
        return await fetchIt(
            `${Settings.remoteURL}/petAllergies`,
            "POST",
            JSON.stringify(petAllergy)
        );
    },
    async editPetAllergy(petAllergy) {
        return await fetchIt(
            `${Settings.remoteURL}/petAllergies/${petAllergy.id}`,
            "PUT",
            JSON.stringify(petAllergy)
        );
    },
    async deletePetAllergy(id) {
        return await fetchIt(
            `${Settings.remoteURL}/petAllergies/${id}`,
            "DELETE"
        );
    },

    // vet visits
    async getVetVisit(id) {
        return await fetchIt(`${Settings.remoteURL}/vetVisits/${id}`);
    },
    async getAllVetVisits() {
        return await fetchIt(`${Settings.remoteURL}/vetVisits`).then((data) =>
            expandVetInVetVisits(data)
        );
    },
    async getAllVetVisitsByPet(petId) {
        return await fetchIt(
            `${Settings.remoteURL}/vetVisits?petId=${petId}&_expand=pet`
        ).then((data) => {
            return expandVetInVetVisits(data);
        });
    },
    async addVetVisit(vetVisit) {
        return await fetchIt(
            `${Settings.remoteURL}/vetVisits`,
            "POST",
            JSON.stringify(vetVisit)
        );
    },
    async editVetVisit(vetVisit) {
        return await fetchIt(
            `${Settings.remoteURL}/vetVisits/${vetVisit.id}`,
            "PUT",
            JSON.stringify(vetVisit)
        );
    },
    async deleteVetVisit(id) {
        return await fetchIt(`${Settings.remoteURL}/vetVisits/${id}`, "DELETE");
    },

    // incidents
    async getIncident(id) {
        return await fetchIt(
            `${Settings.remoteURL}/incidents/${id}?_expand=pet`
        );
    },
    async editIncident(incident) {
        return await fetchIt(
            `${Settings.remoteURL}/incidents/${incident.id}`,
            "PUT",
            JSON.stringify(incident)
        );
    },
    async getAllIncidents() {
        return await fetchIt(`${Settings.remoteURL}/incidents?_expand=pet`);
    },
    async getAllIncidentsByPet(petId) {
        return await fetchIt(
            `${Settings.remoteURL}/incidents?petId=${petId}&_expand=incidentType&_expand=pet`
        );
    },
    async getChronicIllnessesByPet(petId) {
        return await fetchIt(
            `${Settings.remoteURL}/incidents?petId=${petId}&incidentTypeId=3`
        );
    },
    async addIncident(incident) {
        return await fetchIt(
            `${Settings.remoteURL}/incidents`,
            "POST",
            JSON.stringify(incident)
        );
    },
    async editIncident(incident) {
        return await fetchIt(
            `${Settings.remoteURL}/incidents/${incident.id}`,
            "PUT",
            JSON.stringify(incident)
        );
    },
    async deleteIncident(id) {
        return await fetchIt(`${Settings.remoteURL}/incidents/${id}`, "DELETE");
    },
    async getAllIncidentTypes() {
        return await fetchIt(`${Settings.remoteURL}/incidentTypes`);
    },
};
