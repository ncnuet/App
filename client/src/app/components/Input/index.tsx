"use client"

import { getParcelStatus } from "@/redux/services/parcel.api";
import { Button, TextInput, CustomFlowbiteTheme } from "flowbite-react";
import { FormEvent, KeyboardEvent, useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { toast } from "react-toastify";

const theme_btn: CustomFlowbiteTheme['button'] = {
    color: {
        warning: "text-white bg-cyellow-500 border border-transparent enabled:hover:bg-cyellow-600 focus:ring-4 focus:ring-yellow-100 dark:focus:ring-yellow-900"
    }
}

const theme_input: CustomFlowbiteTheme['textInput'] = {
    field: {
        base: "flex h-14 w-full",
        input: {
            base: "rounded-lg overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50",
            colors: {
                warning: "border-cyellow-500 bg-yellow-50 text-cyellow-500 placeholder-yellow-200 focus:border-cyellow-500 focus:ring-cyellow-500"
            },
            sizes: {
                "md": "text-2xl font-semibold"
            }
        }
    }
}

export default function InputTracking() {
    const [pid, setPid] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);

    async function handleNext() {
        setLoading(true)
        try {
            const data = await getParcelStatus([pid])
            if (data && data.data.parcels && data.data.parcels.length > 0) {
                window && window.open("/tracking/" + pid, "_self")
            } else {
                toast.error("Không tồn tại bưu gửi")
            }
        } catch (e: any) {
            console.log(e)
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    function handleEnter(event: KeyboardEvent) {
        if (event.key === "Enter") handleNext();
    }

    function handleChange(event: FormEvent<HTMLInputElement>) {
        setPid(event.currentTarget.value);
    }

    return (
        <div className="mt-10 flex gap-5 items-center">
            <TextInput
                theme={theme_input}
                color="warning"
                type="text"
                placeholder="EB12345678910"
                className="w-full"
                onKeyUp={handleEnter}
                onChange={handleChange}
            />

            <Button
                theme={theme_btn}
                color="warning"
                className="w-14 h-14 items-center justify-center rounded-lg flex-none hidden xs:flex"
                onClick={handleNext}>
                <span className="text-3xl"><HiArrowLongRight></HiArrowLongRight></span>
            </Button>
        </div>
    )
}