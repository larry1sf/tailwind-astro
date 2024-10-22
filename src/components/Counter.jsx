import { useEffect, useState } from "preact/hooks";

import Servidores from "../svg/Servidores";
import Send from "../svg/Send";
import { getmoreAnimes } from "../services/peticiones";
export function Counter({ id, imgBgVoid }) {
    const [favorito, setFavorito] = useState(false)
    const [vistaNotas, setVistaNotas] = useState(false)
    const [items, setItems] = useState([])
    const [vistaMA, setVistaMA] = useState(false)
    // const ultimoItem = useRef(null)
    const [nuevosAnimes, setNuevosAnimes] = useState([])


    useEffect(async () => {
        const llamado = async () => {
            let lla = id.split("-")[0]
            const data = await getmoreAnimes({ id: lla })
            const newR = data.filter(e => e.id !== id)
            return (newR);
        }
        const estadoFavorito = localStorage.getItem(`favorito-${id}`)
        if (estadoFavorito) { setFavorito(JSON.parse(estadoFavorito)) }
        const launchCards = await llamado()
        launchCards.map(e => e = e.title.split("-")[0])
        setNuevosAnimes(launchCards)
        console.log(launchCards);
    }, [id])
    // -------------------------------------------------------------------
    const changeFav = (e) => {
        const newFav = e.target.checked
        setFavorito(newFav)
        localStorage.setItem(`favorito-${id}`, JSON.stringify(newFav))
    }
    // -------------------------------------------------------------------




    // ------------------------------------------------------------------- botones
    const hoverBotones = "hover:brightness-150 hover:bg-slate-600/20 hover:shadow-xl rounded-sm"
    function Btns({
        children,
        typeB = "button",
        diClass = "",
        alt = "",
        note = false,
        trash = false,
        moreAnimes = false }) {

        const click
            = note ? function funBtn() {
                setVistaNotas((newVistaNota) => !newVistaNota)
                if (vistaMA) { setVistaMA((newVistaMa) => !newVistaMa) }
            }
                : trash ? function clearLocalS() {
                    localStorage.removeItem(`notas-${id}`)
                    setItems([])
                }
                    : moreAnimes ? function verAnimes() {
                        setVistaMA(newVista => !newVista)
                        if (vistaNotas) { setVistaNotas((newVistaMa) => !newVistaMa) }
                    }
                        : undefined//? console.log("es nulo") : console.log("no es nulo")

        return (
            <button
                class={`w-full ${hoverBotones}`}
                title={alt}
                aria-label={alt}
                type={typeB} onClick={click} >
                <span class={` transition-colors ${diClass} `}>
                    {children}
                </span>
            </button>
        )
    }
    // ------------------------------------------------------------------- notas
    function Notas() {
        return (
            <>
                <ul id="scroll-notas" class="absolute top-0 right-0 w-[82%] min-h-[80%] overflow-y-auto overflow-x-hidden text-right z-20 leading-loose flex flex-col items-end">
                    {
                        items.map((item, index) => (
                            <li
                                class="text-sm font-normal text-wrap text-right w-auto bg-[url('../public/svg/point-list.svg')] bg-no-repeat pr-6 bg-[right_1px_top_4px] "
                                key={index}
                                ref={index === items.length - 1 ? ultimoItem : null}>{item}</li>
                        ))
                    }
                </ul>

                <div class={`absolute bottom-0 w-[82%] h-[20%] self-end z-10 fade`}>


                    <label htmlFor="nota-aportiva" class="w-full h-full flex items-center">
                        <input
                            class={`w-full px-2 h-full text-sm bg-slate-200/10 dark:text-white border border-slate-600/30 placeholder:text-sm placeholder:font-normal placeholder:text-slate-300 focus:outline-none focus:border-gray-50 focus:ring-1 focus:rounded-sm`}
                            id="nota-aportiva"
                            type="text"
                            maxLength="100"
                            placeholder="Voy en el cap..." />
                        <button
                            class="w-[20%] h-full border border-slate-600"
                            type="button"
                        >
                            <span class="send h-full text-xl border-transparent flex items-center justify-center">
                                <Send />
                            </span>
                        </button>
                    </label>

                </div >
            </>
        )
    }
    function MAnimes() {
        // const changeHCounter = !changeTamaño ? "max-h-28" : ""
        function Card({ title = null ?? "Titulo del anime", estado = null ?? "estado", image = null ?? imgBgVoid, url = null ?? "ruta sin identificar" }) {
            return (
                <a
                    href={url}
                    class="flex group cursor-pointer bg-[#3f40429a] p-[6px] min-h-16 rounded-md me-[4px]">
                    <div class="grow-0 flex items-center">
                        <img src={image} alt={id} height="35" width="35" class="rounded-md text-xs" />
                    </div>

                    <div class="flex flex-col justify-between flex-grow text-sm pb-1">
                        <h4 class="w-36 text-sm font-medium group-hover:text-slate-300" >{title}</h4>
                        <div class="flex justify-end pe-5 text-xs leading-[.6rem] font-normal">
                            <span class="bg-green-400 rounded-lg px-1 py-[2px] text-slate-50 group-hover:text-slate-300">{estado}</span></div>
                    </div>

                    <div class="grow-0 flex items-center">
                        <Servidores></Servidores>
                    </div>
                </a>
            )
        }

        return (
            <div class="w-full flex justify-between flex-col">
                <div class="h-[20%] w-full text-2xl font-bold mb-2">
                    <h3 class=""> Otros animes </h3>
                </div>
                <div class={`overflow-y-auto snap-y snap-mandatory h-[80%] flex flex-col gap-3`}>
                    {
                        nuevosAnimes.map(
                            (e) => <Card
                                title={e.title}
                                url={e.id}
                                image={e.image}
                            />
                        )
                    }

                </div>
            </div>
        )
    }

    const qrView
        = vistaMA ? <MAnimes /> :
            vistaNotas ? <Notas /> : <div >  </div>

    const qrBgTablero = vistaMA || vistaNotas ? "" : ` bg-[url('/svg/favicon.svg')]  bg-no-repeat bg-contain bg-center blur-sm transition-none transition-transform hover:scale-105 hover:transition-transform`
    return (
        <>
            <div class="min-w-full sm:h-full h-36 gap-2 flex relative">
                <div class="w-[20%] basis-1/6 flex flex-col justify-between items-center">

                    <input
                        id="favorito"
                        checked={favorito}
                        onChange={changeFav}
                        type="checkbox"
                        class="hidden" />
                    <label
                        class={`w-full cursor-pointer block fav ${hoverBotones}`}
                        title="Boton de favoritos"
                        aria-label="Boton de favoritos"
                        htmlFor="favorito"><span>&#9825;</span>
                    </label>

                    <Btns
                        diClass="flex items-center justify-center inset"
                        alt="Ver mas animes"
                        moreAnimes>&#9885;</Btns>
                    <Btns
                        diClass="block  scale-75"
                        alt="Ver/activar notas"
                        note>&#9998;</Btns>
                    <Btns
                        diClass="flex items-center justify-center"
                        alt="Eliminar notas"
                        trash>🗑</Btns>

                </div>
                <div className={`w-[90%] flex ${qrBgTablero} `}>

                    {qrView}
                </div>
            </div>
        </>
    )
}

