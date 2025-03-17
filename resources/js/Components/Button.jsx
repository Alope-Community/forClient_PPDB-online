import { Link } from "@inertiajs/react";

export default function ButtonComponent({ text, variant, size, color, link, type }) {
    const templateVariant = {
        secondary: "bg-secondary hover:bg-green-800",
        "outline-secondary":
            "border border-secondary hover:bg-secondary transition hover:text-white",
    };
    const templateColor = {
        white: "text-white",
        secondary: "text-secondary",
    };
    const templateSize = {
        md: "w-[110px] h-[45px]",
        lg: "w-[200px] h-[40px]",
    };
    return (
        type === 'submit'
            ? <button type="submit" className={`rounded-md px-6 py2 flex items-center justify-center ${templateVariant[variant]} ${templateSize[size]} ${templateColor[color]}`}>
                {text}
            </button>
            : <Link
                href={link}
                className={`rounded-md px-6 py2 flex items-center justify-center ${templateVariant[variant]} ${templateSize[size]} ${templateColor[color]}`}
            >
                {text}
            </Link>
    );
}
