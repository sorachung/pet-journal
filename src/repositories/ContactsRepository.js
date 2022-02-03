import Settings from "./Settings"
import { fetchIt } from "./Fetch"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/contacts/${id}`)
    },
    async getExpandAll(id) {
        return await fetchIt(`${Settings.remoteURL}/contacts/${id}?_expand=user&_expand=contactsType`)
    },
    async getVetContacts(id) {
        return await fetchIt(`${Settings.remoteURL}/contacts?contactsType=1`)
    },
    async addContact(contact) {
        return await fetchIt(`${Settings.remoteURL}/contacts`, "POST", JSON.stringify(contact))
    },
    async editContact(contact) {
        return await fetchIt(`${Settings.remoteURL}/contacts/${contact.id}`, "PUT", JSON.stringify(contact))
    },
    async findContactsByUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/contacts?userId=${userId}&_expand=contactsType`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/contacts/${id}`, "DELETE")
    },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/contacts`)
    },
    async getAllExpandAll() {
        return await fetchIt(`${Settings.remoteURL}/contacts?_expand=user&_expand=contactsType`)
    },

    async getContactsTypes() {
        return await fetchIt(`${Settings.remoteURL}/contactsTypes`)
    },
}
