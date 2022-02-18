import Settings from "./Settings"
import { fetchIt } from "./Fetch"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/memories/${id}`)
    },
    async addMemory(memory) {
        return await fetchIt(`${Settings.remoteURL}/memories`, "POST", JSON.stringify(memory))
    },
    async editMemory(memory) {
        return await fetchIt(`${Settings.remoteURL}/memories/${memory.id}`, "PUT", JSON.stringify(memory))
    },
    async findMemoriesByUserEmbedTags(userId) {
        return await fetchIt(`${Settings.remoteURL}/memories?userId=${userId}&_embed=memoriesTags`)
    },
    async findStarredMemoriesByUser(userId) {
        return await fetchIt(`${Settings.remoteURL}/memories?userId=${userId}&starred=true`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/memories/${id}`, "DELETE")
    },

    //memoriesTags fetches
    async getTags(id) {
        return await fetchIt(`${Settings.remoteURL}/memoriesTags/${id}`)
    },
    async addTag(tag) {
        return await fetchIt(`${Settings.remoteURL}/memoriesTags`, "POST", JSON.stringify(tag))
    },
    async editTag(tag) {
        return await fetchIt(`${Settings.remoteURL}/memoriesTags/${tag.id}`, "PUT", JSON.stringify(tag))
    },
    async findTagsByPetExpandMemories(petId) {
        return await fetchIt(`${Settings.remoteURL}/memoriesTags?userId=${petId}&_expand=memory`)
    },
    async deleteTags(id) {
        return await fetchIt(`${Settings.remoteURL}/memoriesTags/${id}`, "DELETE")
    },
}
