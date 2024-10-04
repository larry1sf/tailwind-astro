
const Lupa = ({ width = 24, height = 36, color = 'currentColor', title = 'Lupa' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            role="img"
            aria-labelledby="lupaTitle lupaDesc"
        >
            <title id="lupaTitle">{title}</title>
            <desc id="lupaDesc">Un icono de lupa para representar la función de búsqueda</desc>
            <circle
                cx="11"
                cy="11"
                r="7"
                stroke={color}
                stroke-width="2"
                role="presentation"
            />
            <path
                d="M20 20L16 16"
                stroke={color}
                stroke-width="2"
                stroke-linecap="round"
                role="presentation"
            />
        </svg>
    )
}

export default Lupa