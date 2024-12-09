import type { Res, QueryVariables } from "@/types/typadoAnimeList"
var query: string = `
query Query($sort: [MediaSort], $search: String) {
  Page {
    media(sort: $sort, search: $search) {
      id
      title {
        userPreferred
      }
      tags {
        name
      }
      status
      bannerImage
      coverImage {
        extraLarge
        large
        medium
        color
      }
      description
    }
  }
}

` ;

// Define our query variables and values that will be used in the query request
var variables: QueryVariables = {
    search: "bleach",
    sort: "ID"
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };



export async function dd() {
    try {

        const response = await fetch(url, options)

        const data = await handleResponse(response)

        return handleData(data);
    } catch (error) {

        throw error;
    }
}

// Función para manejar la respuesta 
async function handleResponse(response: Response) {
    const json = await response.json();
    // Retorna el JSON si la respuesta es OK, de lo contrario, rechaza la promesa
    return response.ok ? json : Promise.reject(json);
}

// Función para manejar los datos 
function handleData(data: Res) {
    function recortarTexto(texto: string, maxLength: number): string {
        return texto.length > maxLength ? texto.slice(0, maxLength) : texto;
    }
    function ajustarTexto(texto: string[], maxLength: number): string[] {
        let newText = "no-tag-asignaded"
        texto.length <= 9
            ? newText = texto.join(",").replaceAll(",", " ~ ") ?? "sa"
            : newText = texto.splice(0, 9).join(",").replaceAll(",", " ~ ")
        texto.length === 0
            ? newText = "No ~ Tag ~ Anignaded" : ""



        return [newText]
    }
    return data.data.Page.media.map((e) => ({
        id: e.id,
        title: e.title.userPreferred,
        tags: ajustarTexto(
            e.tags.map((tag: { name: string }) => tag.name), 41),
        status: e.status,
        img: e.bannerImage,
        imgFondo: e.coverImage.medium,
        description: e.description
            ? recortarTexto(
                e.description
                    ?.replace(/(<\/?b>|<b>|\n|<br>|---|-|<ul>|<\/ul>|<u>|<\/u>|<i>|<\/i>)/g, '')
                    .replace(/[1-9]|[?]|[.]/g, ""), 120)
            : "N/A"
    }));
}
