import Settings from "./Settings"
import { fetchIt } from "./Fetch"

export default {
    //events
    async getEvent(id) {
        return await fetchIt(`${Settings.remoteURL}/events/${id}`)
    },
    async addEvent(event) {
        return await fetchIt(`${Settings.remoteURL}/events`, "POST", JSON.stringify(event))
    },
    async editEvent(event) {
        return await fetchIt(`${Settings.remoteURL}/events/${event.id}`, "PUT", JSON.stringify(event))
    },
    async findEventsByUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/events?userId=${userId}`)
    },
    async findStarredEventsByUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/events?userId=${userId}&starred=true`)
    },
    async findEventsByPet(petId) {
        return await fetchIt(`${Settings.remoteURL}/events?petId=${petId}`)
    },
    async deleteEvent(id) {
        return await fetchIt(`${Settings.remoteURL}/events/${id}`, "DELETE")
    },

    //reminder
    async getReminder(id) {
        return await fetchIt(`${Settings.remoteURL}/reminders/${id}`)
    },
    async addReminder(reminder) {
        return await fetchIt(`${Settings.remoteURL}/reminders`, "POST", JSON.stringify(reminder))
    },
    async editReminder(reminder) {
        return await fetchIt(`${Settings.remoteURL}/reminders/${reminder.id}`, "PUT", JSON.stringify(reminder))
    },
    async findRemindersByUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/reminders?userId=${userId}`)
    },
    async findStarredRemindersByUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/reminders?userId=${userId}&starred=true`)
    },
    async findRemindersByPet(petId) {
        return await fetchIt(`${Settings.remoteURL}/reminders?petId=${petId}`)
    },
    async deleteReminder(id) {
        return await fetchIt(`${Settings.remoteURL}/reminders/${id}`, "DELETE")
    },

    //repeats
    async getRepeats() {
        return await fetchIt(`${Settings.remoteURL}/repeats`)
    }
}