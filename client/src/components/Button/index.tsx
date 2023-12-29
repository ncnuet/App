import { IoReload } from "react-icons/io5"

interface IProps {
    name: string,
    icon: any,
    onClick?: () => void,
    disabled?: boolean
}

export default function Button({ name, icon, onClick, disabled }: IProps) {
    return (
        <button
            disabled={disabled}
            onClick={() => { onClick && onClick() }}
            className="min-w-[76px] px-[10px] py-[5px] rounded-lg flex flex-row items-center gap-1 bg-cyellow-500 text-black hover:opacity-80 active:opacity-90"
        >
            {disabled
                ? <span className="animate-spin"><IoReload /></span>
                : <span className="">{icon}</span>}
            <span className="text-[15px] font-normal">{name}</span>
        </button>
    )
}