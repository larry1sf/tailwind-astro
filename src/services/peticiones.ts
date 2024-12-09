// import { ANIME } from "@consumet/extensions";
// import { type RecienteSearch, type AnimeInfo } from "@/types/types";


// const gogo = new ANIME.Gogoanime();

// export async function SimpleSearch(id?: string) {
//     try {
//         const data = await gogo.fetchAnimeInfo(id ?? "momo")
//         return data
//     } catch (error) {
//         return new Error(`Salio un Error! ${error}`)
//     }
// }

// export async function RecinteSearch(id?: string) {
//     try {
//         const data = await gogo.fetchRecentEpisodes() as RecienteSearch
//         const promises = data.results.map(async e => {
//             return (await gogo.fetchAnimeInfo(e.id)) as AnimeInfo
//         })
//         return await Promise.all(promises)
//     }
//     catch (ex) {
//         return new Error("algo salio mal!" + ex);
//     }
// }