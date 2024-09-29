import { useEffect, useState } from "preact/hooks";
import Lupa from "../svg/Lupa"
import Servidores from "../svg/Servidores";
import Send from "../svg/Send";

export function Counter({ id }) {
    const [favorito, setFavorito] = useState(false)
    const [vistaNotas, setVistaNotas] = useState(false)

    useEffect(() => {
        const estadoFavorito = localStorage.getItem(`favorito-${id}`)
        if (estadoFavorito) { setFavorito(JSON.parse(estadoFavorito)) }
    }, [id])

    const changeFav = (e) => {
        const newFav = e.target.checked
        setFavorito(newFav)
        localStorage.setItem(`favorito-${id}`, JSON.stringify(newFav))
    }
    // -------------------------------------------------------------------
    const [inputValue, setInputValue] = useState("")
    const [items, setItems] = useState([])

    // 
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    // 
    const handleAddItem = () => {
        console.log("se esta lanzando el añadidor de items");

        if (inputValue.trim() !== "") {
            setItems((prevItems) => [...prevItems, inputValue])
            setInputValue("")
        }
    }
    // -------------------------------------------------------------------
    const hoverBotones = "hover:brightness-125 hover:bg-slate-600/20 rounded-sm"
    function Btns({ children, typeB = "button", diClass = "", note = false }) {

        const click = note
            ? function funBtn() {
                setVistaNotas((newVistaNota) => !newVistaNota)
            }
            : undefined //? console.log("es nulo") : console.log("no es nulo")

        return (
            <button class={`w-full ${hoverBotones}`} type={typeB} onClick={click} >
                <span class={` transition-colors ${diClass} `}>
                    {children}
                </span>
            </button>
        )
    }

    function Notas() {
        return (
            <div class="w-full  self-end">

                <div class="w-full flex fade">
                    <label htmlFor="nota-aportiva" class="w-[80%] flex items-center">
                        <input
                            class="w-full px-2 h-[30px] text-sm bg-slate-200/10 dark:text-white border border-slate-600/30 placeholder:text-[13px] placeholder:font-normal placeholder:text-slate-300 focus:outline-none focus:border-gray-50 focus:ring-1 focus:rounded-sm"
                            id="nota-aportiva"
                            type="text"
                            maxLength="50"
                            value={inputValue}
                            onChange={handleInputChange}
                            onMouseLeave={(e) => { e.stopPropagation() }}
                            placeholder="Guarda apuntes del anime" />
                    </label>

                    <button
                        class="w-[20%] h-full border border-slate-600"
                        type="button"
                        onClick={handleAddItem()}>
                        <span class="send h-full text-xl border-transparent flex justify-center">
                            <Send />
                        </span>
                    </button>
                </div>
            </div >
        )
    }

    const qrVNotas = vistaNotas ? <Notas /> : <p class="fade">nonda</p>
    return (
        <>
            <div class="min-w-full h-full gap-2 flex">
                <div class="w-[20%] basis-1/6 flex flex-col justify-between items-center">

                    <input
                        id="favorito"
                        checked={favorito}
                        onChange={changeFav}
                        type="checkbox"
                        class="hidden" />
                    <label class={`w-full cursor-pointer block fav ${hoverBotones}`} htmlFor="favorito"><span>&#9825;</span></label>

                    <Btns diClass="block  scale-75" note>&#9998;</Btns>
                    <Btns diClass="flex items-center justify-center">{<Lupa></Lupa>}</Btns>
                    <Btns diClass="flex items-center justify-center inset">{<Servidores></Servidores>}</Btns>

                </div>
                <div className={`w-[80%] flex`}>
                    <ul class="absolute">
                        {
                            items.map((item, index) => (
                                <li class="text-sm font-normal" key={index}>{item}</li>
                            ))
                        }
                    </ul>
                    {qrVNotas}
                </div>
            </div>
        </>
    )
}

