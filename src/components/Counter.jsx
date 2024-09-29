import { useEffect, useState } from "preact/hooks";
import Lupa from "../svg/Lupa"
import Servidores from "../svg/Servidores";
export function Counter({ id }) {
    const [favorito, setFavorito] = useState(false)
    useEffect(() => {
        const estadoFavorito = localStorage.getItem(`favorito-${id}`)
        if (estadoFavorito) { setFavorito(JSON.parse(estadoFavorito)) }
    }, [id])

    const changeFav = (e) => {
        const newFav = e.target.checked
        setFavorito(newFav)
        localStorage.setItem(`favorito-${id}`, JSON.stringify(newFav))
    }

    function Btns({ children, typeB = "button", diClass = "", note = false }) {
        return (
            <button type={typeB} onClick={() => { }} ><span class={`max-w-[20px] transition-colors ${diClass}`}>{children}</span></button>
        )
    }

    function Notas() {
        return (
            <div class="flex absolute bottom-0 right-0">
                <label htmlFor="nota-aportiva" class="basis-4/5 flex ">
                    <input class="w-64 px-2 text-xl start-0 bg-slate-200/10 dark:text-white border border-slate-600/30 translate-x-[.5px]" id="nota-aportiva" type="text" maxLength="50" />
                </label>

                <button type="button" class="basis-1/5 ">
                    <span class="block w-16 text-xl  border-transparent">📤</span>
                </button>
            </div>
        )
    }


    return (
        <>
            <div class="min-w-full gap-2 flex">
                <div class="basis-1/6 flex flex-col gap-5 justify-center items-center">

                    <input
                        id="favorito"
                        checked={favorito}
                        onChange={changeFav}
                        type="checkbox"
                        class="hidden" />
                    <label class="block fav" htmlFor="favorito"><span>&#9825;</span></label>

                    <Btns diClass="block -translate-x-1 scale-75" note>&#9998;</Btns>
                    <Btns diClass="flex items-center justify-center">{<Lupa></Lupa>}</Btns>
                    <Btns diClass="flex items-center justify-center" note>{<Servidores></Servidores>}</Btns>

                </div>
                <div className={` border border-slate-600  min-w-80 rounded-sm relative m-0`}>
                    saas
                </div>
            </div>
        </>
    )
}

