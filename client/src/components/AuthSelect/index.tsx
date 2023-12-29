"use client";
import { SelectProps } from "flowbite-react";
import { useEffect, useState } from "react";

export type InputStatus = "success" | "failure" | "normal";

interface IProps extends SelectProps {
    title: string,
    icon?: any
    isHiddenPassword?: boolean;
    status?: InputStatus;
    name: string,
    error_text?: {
        name: string;
        message: string;
    },
    data: {
        name: string,
        value: string
    }[]
}

function AuthSelect({
    data,
    title,
    icon,
    error_text,
    name,
    placeholder,
    onChange,
    status = "normal"
}: IProps) {

    function onFocusHandler() {
        if (status === "failure") setInnerStatus("normal");
    }

    useEffect(() => {
        setInnerStatus(status)
    }, [status])

    const [innerStatus, setInnerStatus] = useState<InputStatus>("normal");

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
                <select
                    name={name}
                    placeholder={placeholder}
                    onFocus={onFocusHandler}
                    onChange={onChange}
                    className={"w-full h-[32px] border-none bg-transparent text-[16px] outline-none leading-[100%] " +
                        (innerStatus === "failure"
                            ? "placeholder-cred-400"
                            : innerStatus === "success"
                                ? "placeholder-cgreen-600"
                                : "text-cgray-500"
                        )}>

                    {data.map((item, index) => (
                        <option value={item.value} key={index}>{item.name}</option>
                    ))}
                </select>
            </div>
            <span className="text-sm text-cred-400">{error_text?.name === name ? error_text.message : ""}</span>
        </div>
    );
}

export default AuthSelect;
