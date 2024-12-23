"use client"

type Props = {
    label: string;
    onClick?: () => void;
    size: 0 | 1 | 2 | 3;
    red?: boolean
}

export const Button = ({ label, onClick, size, red }: Props) => {
    return (
        <div
            onClick={onClick}
            className={`
                ${red ? "active:bg-red-900" : "active:bg-deep-blue-1000"}
                inline-flex
                justify-center
                items-center
                cursor-pointer
                ${red ? "bg-red-700" : "bg-deep-blue"}
                text-white 
                font-semibold
                text-center
                rounded-full
                 shadow-sm
                    ${size === 0 && "2xl:py-4 2xl:px-6 py-3 px-6 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"}
                    ${size === 1 && "py-3 px-6 text-lg"}
                    ${size === 2 && "py-3 px-6 text-base"}
                    ${size === 3 && "py-2 px-4 text-xs"} 
                `}>
            {label}
        </div>
    );
}