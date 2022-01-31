import Settings from "./Settings"
import { fetchIt } from "./Fetch"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`)
    },
    async getEmbedPets(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}&_embed=pets`)
    },
    async getEmbedContacts(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}&_embed=contacts`)
    },
    async createAccount(user) {
        return await fetchIt(`${Settings.remoteURL}/users`, "POST", JSON.stringify(user))
    },
    async editAccount(user) {
        return await fetchIt(`${Settings.remoteURL}/users`, "PUT", JSON.stringify(user))
    },
    async findUser(un) {
        return await fetchIt(`${Settings.remoteURL}/users?email=${un}`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`, "DELETE")
    },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/users`)
    },
    async getAllEmbedPets() {
        return await fetchIt(`${Settings.remoteURL}/users&_embed=pets`)
    },
    async getAllEmbedContacts() {
        return await fetchIt(`${Settings.remoteURL}/users&_embed=contacts`)
    }
}
