import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import ContactsRepository from "./ContactsRepository"

const expandVetInVetVisits = (vetVisit) => {
    vetVisit.vet = ContactsRepository.get(vetVisit.vetId);
    return vetVisit;

}

export default {
    // vaccinations
    async getVaccination(id) {
        return await fetchIt(`${Settings.remoteURL}/vaccinations/${id}?_expand=pet&_expand=vaccination`)
    },
    async getAllVaccinations() {
        return await fetchIt(`${Settings.remoteURL}/vaccinations?_expand=pet&_expand=vaccination`)
    },

    async getPetVaccinationsByPet(petId) {
        return await fetchIt(`${Settings.remoteURL}/petVaccinations?petId=${petId}&_expand=pet&_expand=vaccination`)
    },
    async addPetVaccination(petVaccination) {
        return await fetchIt(`${Settings.remoteURL}/petVaccinations`, "POST", JSON.stringify(petVaccination))
    },
    async editPetVaccination(petVaccination) {
        return await fetchIt(`${Settings.remoteURL}/petVaccinations/${petVaccination.id}`, "PUT", JSON.stringify(petVaccination))
    },
    async deletePetVaccination(id) {
        return await fetchIt(`${Settings.remoteURL}/petVaccinations/${id}`, "DELETE")
    },

    // medications
    async getPetMedication(id) {
        return await fetchIt(`${Settings.remoteURL}/petMedications/${id}?_expand=pet&_embed=vetvisits`)
    },
    async getAllPetMedications() {
        return await fetchIt(`${Settings.remoteURL}/petMedications?_expand=pet&_embed=vetvisits`)
    },
    async getMedicationsByPet(petId) {
        return await fetchIt(`${Settings.remoteURL}/petMedications?petId=${petId}&_expand=pet&_embed=vetvisits`)
    },
    async addPetMedication(petMedication) {
        return await fetchIt(`${Settings.remoteURL}/petMedications`, "POST", JSON.stringify(petMedication))
    },
    async editPetMedication(petMedication) {
        return await fetchIt(`${Settings.remoteURL}/petMedications/${petMedication.id}`, "PUT", JSON.stringify(petMedication))
    },
    async deletePetMedication(id) {
        return await fetchIt(`${Settings.remoteURL}/petMedications/${id}`, "DELETE")
    },

    //allergies
    async getPetAllergy(id) {
        return await fetchIt(`${Settings.remoteURL}/petAllergies/${id}?_expand=pet`)
    },
    async getAllPetAllergies() {
        return await fetchIt(`${Settings.remoteURL}/petAllergies?_expand=pet`)
    },
    async addPetAllergy(petAllergy) {
        return await fetchIt(`${Settings.remoteURL}/petAllergies`, "POST", JSON.stringify(petAllergy))
    },
    async editPetAllergy(petAllergy) {
        return await fetchIt(`${Settings.remoteURL}/petAllergies/${petAllergy.id}`, "PUT", JSON.stringify(petAllergy))
    },
    async deletePetAllergy(id) {
        return await fetchIt(`${Settings.remoteURL}/petAllergies/${id}`, "DELETE")
    },

    // vet visits
    async getVetVisit(id) {
        return await fetchIt(`${Settings.remoteURL}/vetVisits/${id}?_expand=incident&_expand=petMedication`)
    },
    async getAllVetVisits() {
        return await fetchIt(`${Settings.remoteURL}/vetVisits?_expand=pet&_expand=incident&_expand=petMedication`)
            .then(data => expandVetInVetVisits(data))
    },
    async addVetVisit(vetVisit) {
        return await fetchIt(`${Settings.remoteURL}/vetVisits`, "POST", JSON.stringify(vetVisit))
    },
    async editVetVisit(vetVisit) {
        return await fetchIt(`${Settings.remoteURL}/vetVisits`, "PUT", JSON.stringify(vetVisit))
    },
    async deleteVetVisit(id) {
        return await fetchIt(`${Settings.remoteURL}/vetVisits/${id}`, "DELETE")
    },

    // incidents
    async getIncident(id) {
        return await fetchIt(`${Settings.remoteURL}/incidents/${id}?_expand=pet&_expand=petMedication&_expand=vetVisit`)
    },
    async editIncident(incident) {
        return await fetchIt(`${Settings.remoteURL}/incidents/${incident.id}`, "PUT", JSON.stringify(incident))
    },
    async getAllIncidents() {
        return await fetchIt(`${Settings.remoteURL}/incidents?_expand=pet`)
    },
    async getAllIncidentsByPet(petId) {
        return await fetchIt(`${Settings.remoteURL}/incidents?petId=${petId}&_expand=petMedication&_expand=incidentType`)
    },
    async getChronicIllnessesByPet(petId) {
        return await fetchIt(`${Settings.remoteURL}/incidents?petId=${petId}&incidentTypeId=3&_expand=pet`)
    },
    async addIncident(incident) {
        return await fetchIt(`${Settings.remoteURL}/incidents`, "POST", JSON.stringify(incident))
    },
    async editIncident(incident) {
        return await fetchIt(`${Settings.remoteURL}/incidents`, "PUT", JSON.stringify(incident))
    },
    async deleteIncident(id) {
        return await fetchIt(`${Settings.remoteURL}/incidents/${id}`, "DELETE")
    },
}
