import { ANIME } from "@consumet/extensions";
import {type ResApiInfoAnimes, type resApiAnimes } from "../types/resApiAnimes";
const proveedor = new ANIME.Gogoanime();

export const getLaunById = async ({id}:{id:string}) => {
// const data = async (busqueda = "") => {
    const {results:datos} = await proveedor.search(id) as resApiAnimes
    const {...ddt} = await proveedor.fetchAnimeInfo(datos[0].id) as ResApiInfoAnimes
    
    return {ddt,datos}
};
// return data(id)
// }


export const getServers = async ({id}:{id:string}) =>{
    const {ddt:epi} = await getLaunById({id})
    // const epis = epi.episodes.map((e)=>e.id)
}


// peticion por cara elemento en array de animes.
export const getAllPeticiones = async (p=[""]) => {
const data = async (busqueda = "") => {
    const primerResult = await getLaunById({id:busqueda})
    const updatedResult = await Promise.all(
        primerResult.datos.map(async (item) => {
            const { status: estados, releaseDate } =
                await proveedor.fetchAnimeInfo(item.id);
            return { ...item, estado: estados, releaseDate };
        }),
    );
    return updatedResult;
};

// repitiendo por aca posicion para hacer mas facil la implementacion de mas animes.
const UAll = async (llamadas = [""]) => {
    return await Promise.all(
        llamadas.map(async (llamada = "") => {
            return await data(llamada);
        }),
    );
};

return UAll(p)
}