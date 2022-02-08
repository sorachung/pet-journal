import Settings from "./Settings"
import { fetchIt } from "./Fetch"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/pets/${id}`)
    },
    async getExpandAll(id) {
        return await fetchIt(`${Settings.remoteURL}/pets/${id}?_expand=specie&_expand=user&_expand_photo&_expand=sex`)
    },
    async getEmbedMedical(id) {
        return await fetchIt(`${Settings.remoteURL}/pets/${id}?_embed=vetVisits&_embed=petVaccinations&_embed=petMedications&_embed=petAllergies`)
    },
    async addPet(pet) {
        return await fetchIt(`${Settings.remoteURL}/pets`, "POST", JSON.stringify(pet))
    },
    async editPet(pet) {
        return await fetchIt(`${Settings.remoteURL}/pets/${pet.id}`, "PUT", JSON.stringify(pet))
    },
    async findPetsByUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/pets?userId=${userId}`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/pets/${id}`, "DELETE")
    },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/pets`)
    },
    async getAllExpandAllByUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/pets?userId=${userId}&_expand=specie&_expand=user&_expand_photo&_expand=sex`)
    },

    // fetches for unchanging data
    async getSpecies() {
        return await fetchIt(`${Settings.remoteURL}/species`)
    },
    async getSexes() {
        return await fetchIt(`${Settings.remoteURL}/sexes`)
    }


}