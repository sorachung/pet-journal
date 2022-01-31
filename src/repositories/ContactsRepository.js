import Settings from "./Settings"
import { fetchIt } from "./Fetch"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/contacts/${id}`)
    },
    async getExpandAll(id) {
        return await fetchIt(`${Settings.remoteURL}/contacts/${id}&_expand=user&_expand=contactsType`)
    },
    async addContact(contact) {
        return await fetchIt(`${Settings.remoteURL}/contacts`, "POST", JSON.stringify(contact))
    },
    async editContact(contact) {
        return await fetchIt(`${Settings.remoteURL}/contacts`, "PUT", JSON.stringify(contact))
    },
    async findContactsByUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/contacts?userId=${userId}`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/contacts/${id}`, "DELETE")
    },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/contacts`)
    },
    async getAllExpandAll() {
        return await fetchIt(`${Settings.remoteURL}/contacts&_expand=user&_expand=contactsType`)
    }
}
