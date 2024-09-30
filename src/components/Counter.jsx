import { useEffect, useState } from "preact/hooks";
import Lupa from "../svg/Lupa"
import Servidores from "../svg/Servidores";
import Send from "../svg/Send";

export function Counter({ id }) {
    const [favorito, setFavorito] = useState(false)
    const [vistaNotas, setVistaNotas] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [items, setItems] = useState([])

    useEffect(() => {
        const estadoFavorito = localStorage.getItem(`favorito-${id}`)
        const estadoNotas = localStorage.getItem(`notas-${id}`)
        if (estadoFavorito) { setFavorito(JSON.parse(estadoFavorito)) }
        if (estadoNotas) { setItems(JSON.parse(estadoNotas)) }
    }, [id])

    const changeFav = (e) => {
        const newFav = e.target.checked
        setFavorito(newFav)
        localStorage.setItem(`favorito-${id}`, JSON.stringify(newFav))
    }
    // -------------------------------------------------------------------

    // 
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    // 
    const handleAddItem = () => {

        if (inputValue.trim() !== "") {
            const newItem = [...items, inputValue]
            setItems(newItem)
            localStorage.setItem(`notas-${id}`, JSON.stringify(newItem))
            setInputValue("")
        }
    }
    // 
    const handleKey = (e) => {
        if (e.key === "Enter") {
            handleAddItem()
        }
    }

    // ------------------------------------------------------------------- botones
    const hoverBotones = "hover:brightness-150 hover:bg-slate-600/20 hover:shadow-xl rounded-sm"
    function Btns({ children, typeB = "button", diClass = "", alt = "", note = false, trash = false }) {

        const click = note
            ? function funBtn() {
                setVistaNotas((newVistaNota) => !newVistaNota)
            }
            : trash ? function clearLocalS() {
                localStorage.removeItem(`notas-${id}`)
                setItems([])
            }
                : undefined//? console.log("es nulo") : console.log("no es nulo")

        return (
            <button title={alt} aria-label={alt} class={`w-full ${hoverBotones}`} type={typeB} onClick={click} >
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
                <ul class="absolute top-0 right-0 w-[80%] h-[80%] overflow-y-auto overflow-x-hidden text-right z-20  leading-loose flex flex-col  items-end">
                    {
                        items.map((item, index) => (
                            <li class="text-sm font-normal text-wrap text-right w-auto bg-[url('../public/svg/point-list.svg')] bg-no-repeat pr-6 bg-[right_1px_top_4px] " key={index}>{item}</li>
                        ))
                    }
                </ul>

                <div class={`w-full h-[20%] self-end z-10`}>

                    <div class="w-full h-full flex fade">
                        <label htmlFor="nota-aportiva" class="w-[80%] h-full flex items-center">
                            <input
                                class="w-full px-2 h-full text-sm bg-slate-200/10 dark:text-white border border-slate-600/30 placeholder:text-sm placeholder:font-normal placeholder:text-slate-300 focus:outline-none focus:border-gray-50 focus:ring-1 focus:rounded-sm"
                                id="nota-aportiva"
                                type="text"
                                maxLength="50"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKey}
                                placeholder="Voy en el cap..." />
                        </label>

                        <button
                            class="w-[20%] h-full border border-slate-600"
                            type="button"
                            onClick={handleAddItem()}>
                            <span class="send h-full text-xl border-transparent flex items-center justify-center">
                                <Send />
                            </span>
                        </button>
                    </div>
                </div >
            </>
        )
    }
    const qrVNotas = vistaNotas ? <Notas /> : <></>
    return (
        <>
            <div class="min-w-full h-full gap-2 flex relative">
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
                        htmlFor="favorito"><span>&#9825;</span></label>

                    <Btns
                        diClass="block  scale-75"
                        alt="Ver/activar notas"
                        note>&#9998;</Btns>
                    {/* <Btns diClass="flex items-center justify-center">{<Lupa></Lupa>}</Btns> */}
                    <Btns
                        diClass="flex items-center justify-center"
                        alt="Eliminar notas"
                        trash>🗑</Btns>
                    <Btns
                        diClass="flex items-center justify-center inset"
                        alt="Ver anime en otros servidores" >{<Servidores></Servidores>}</Btns>

                </div>
                <div className={`w-[90%] flex`}>

                    {qrVNotas}
                </div>
            </div>
        </>
    )
}

