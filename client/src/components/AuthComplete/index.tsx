"use client";
import Tippy from "@tippyjs/react";
import { ChangeEvent, useEffect, useState } from "react";
export type InputStatus = "success" | "failure" | "normal";

interface IProps {
    title: string,
    icon?: any
    isHiddenPassword?: boolean;
    status?: InputStatus;
    name: string,
    disabled?: boolean;
    error_text?: {
        name: string;
        message: string;
    };
    placeholder?: string;
    onChange?: (value: string) => void;
    suggestion?: (text: string) => Promise<{ name: string, value: string }[]>
}

interface IPropsForMenu {
    data: { name: string, value: string }[],
    onSelect: (value: string, name: string) => void
}

function Selector({ data, onSelect }: IPropsForMenu) {
    return (
        <div className="w-56">
            {data.map((item, index) => (
                <div
                    className="p-2 px-3 cursor-pointer hover:bg-indigo-300 rounded-md"
                    key={index}
                    onClick={() => onSelect(item.value, item.name)}>
                    {item.name}
                </div>
            ))}
        </div>

    )
}

function AuthComplete({
    title,
    icon,
    error_text,
    name,
    placeholder,
    onChange,
    disabled,
    suggestion,
    status = "normal",
}: IProps) {
    const [innerStatus, setInnerStatus] = useState<InputStatus>("normal");
    const [data, setData] = useState<{ name: string, value: string }[]>([]);
    const [value, setValue] = useState("");
    const [fakename, setFakename] = useState("");

    function onFocusHandler() {
        if (status === "failure") setInnerStatus("normal");
    }

    useEffect(() => {
        setInnerStatus(status)
    }, [status])

    function onSelected(value: string, _name: string) {
        onChange && onChange(value);
        setValue(value);
        setFakename(_name)
    }

    async function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        setFakename(e.target.value);
        if (e.target.value.trim().length !== 0) {
            const r_data = suggestion ? await suggestion(e.target.value) : [];
            setData(r_data);
        }
    }

    return (
        <div>
            <h3 className="text-[12px] text-gray-600 font-[500] pb-2">{title}</h3>
            <div
                className={"py-2 pl-4 pr-2 bg-gray-100 flex flex-row items-center rounded border " +
                    (innerStatus === "failure"
                        ? "text-cred-400 border-cred-400"
                        : innerStatus === "success"
                            ? "text-cgreen-600 border-cgreen-600"
                            : "text-cgray-500"
                    )}>

                {/* Icon */}
                {icon}

                {/* Input area */}
                <input className="hidden" name={name} value={value} />
                <Tippy
                    className=""
                    trigger="click"
                    interactive
                    theme="light"
                    content={<Selector data={data} onSelect={onSelected} />}>

                    <input
                        value={fakename}
                        disabled={disabled}
                        autoComplete="false"
                        placeholder={placeholder}
                        onFocus={onFocusHandler}
                        onChange={handleTextChange}
                        className={"w-full h-[32px] border-none bg-transparent text-[16px] outline-none leading-[100%] " +
                            (innerStatus === "failure"
                                ? "placeholder-cred-400"
                                : innerStatus === "success"
                                    ? "placeholder-cgreen-600"
                                    : "text-cgray-500"
                            )} />
                </Tippy>

            </div>

            <span className="text-sm text-cred-400">{error_text?.name === name ? error_text.message : ""}</span>
        </div>
    );
}

export default AuthComplete;
