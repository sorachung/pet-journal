import Settings from "./Settings"
import { fetchIt } from "./Fetch"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/notes/${id}`)
    },
    async addNote(note) {
        return await fetchIt(`${Settings.remoteURL}/notes`, "POST", JSON.stringify(note))
    },
    async editNote(note) {
        return await fetchIt(`${Settings.remoteURL}/notes/${note.id}`, "PUT", JSON.stringify(note))
    },
    async findNotesByUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/notes?userId=${userId}&starred=true&_expand=pet&_sort=timestamp&_order=desc`)
    },
    async findNotesByPet(petId) {
        return await fetchIt(`${Settings.remoteURL}/notes?petId=${petId}&_sort=timestamp&_order=desc`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/notes/${id}`, "DELETE")
    }
}