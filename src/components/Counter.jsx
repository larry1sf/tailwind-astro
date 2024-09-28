import { useState } from "preact/hooks";
export function Counter() {
    const [count, setCount] = useState(0)
    return (
        <>
            <span>{count}</span>
            <button class="px-4 py-3 mx-2 bg-sky-500  text-white" onClick={() => setCount(count + 1)} type="button">+ aumentar</button>
            <button class="px-4 py-3 mx-2 bg-sky-500  text-white" onClick={() => setCount(count - 1)} type="button">- restas</button>
        </>
    )
}

