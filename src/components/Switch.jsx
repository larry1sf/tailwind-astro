import { useEffect, useState } from "preact/hooks"

export function Switch({ nameS = "Switch" }) {
    const [visto, setVisto] = useState(false)
    useEffect(() => {
        const localVista = localStorage.getItem(`visto-${nameS}`)
        if (localVista) { setVisto(JSON.parse(localVista)) }
    }, [])

    function handleClick() {
        const val = !visto
        setVisto(val)
        localStorage.setItem(`visto-${nameS}`, JSON.stringify(val))
    }
    const qrText = visto ? "Lo haz visto" : "Aun no visto"
    return (
        <>
            <label
                class="w-[20%] relative flex flex-col items-center cursor-pointer"

            >
                <input checked={visto} type="checkbox" value="" class="sr-only peer" onClick={handleClick} />
                <div
                    class="group peer ring-0 bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 rounded-full outline-none duration-1000 after:duration-200 w-10 h-6 shadow-md peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39] peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)] after:outline-none after:h-4 after:w-4 after:top-1 after:left-[.8rem] peer-checked:after:translate-x-4 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-sky-400 peer-checked:to-blue-500"
                >
                </div>
                <small class="text-[9px] leading-[10px] translate-y-[.4rem] font-normal"
                >{qrText}</small>
            </label>
        </>
    )
}