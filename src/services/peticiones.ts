import { ANIME } from "@consumet/extensions";
import {type ResApiInfoAnimes, type resApiAnimes } from "../types/resApiAnimes";

export const getLaunById = async ({id}:{id:string}) => {
const data = async (busqueda = "") => {
    const proveedor = new ANIME.Gogoanime();
    const {results:datos} = await proveedor.search(busqueda) as resApiAnimes
    const {...ddt} = await proveedor.fetchAnimeInfo(datos[0].id) as ResApiInfoAnimes
    return ddt
};

return data(id)
}
export const getAllPeticiones = async (p=[""]) => {
const data = async (busqueda = "") => {
    const proveedor = new ANIME.Gogoanime();
    const { results: primerResult } = (await proveedor.search(
        busqueda,
    )) as resApiAnimes;

    const updatedResult = await Promise.all(
        primerResult.map(async (item) => {
            const { status: estados, releaseDate } =
                await proveedor.fetchAnimeInfo(item.id);
            return { ...item, estado: estados, releaseDate };
        }),
    );
    return updatedResult;
};

const UAll = async (llamadas = [""]) => {
    return await Promise.all(
        llamadas.map(async (llamada = "") => {
            return await data(llamada);
        }),
    );
};

return UAll(p)
}