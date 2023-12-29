import AuthButton from "@/components/AuthButton";
import AuthComplete from "@/components/AuthComplete";
import AuthInput, { InputStatus } from "@/components/AuthInput/AuthInput";
import AuthSelect from "@/components/AuthSelect";
import { profileState } from "@/redux/features/profile.slice";
import { useAppSelector } from "@/redux/hooks";
import { createOffice, getSuggestionOffice } from "@/redux/services/office.api";
import { createUser, getSuggestionUser } from "@/redux/services/user.api";
import { ResponseData } from "@/utils/axios";
import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
    onDone: () => void;
}

const officeType = [
    { name: "Điểm giao dịch", value: "transaction" },
    { name: "Điểm tập kết", value: "gathering" }
]

export default function FormCreate({ onDone }: IProps) {
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState<ResponseData>();
    const [status, setStatus] = useState<InputStatus>("normal")
    const user = useAppSelector(profileState);

    function submitCreateUserHandler(e: FormEvent<HTMLFormElement>) {
        setLoading(true);
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const body = Object.fromEntries(formData.entries());

        console.log(body);
        const add = JSON.parse(body.address as string || "[]");

        const wrapper = {
            name: body.name,
            address: {
                country: "vi",
                province: add[2],
                district: add[1],
                commune: add[0],
            },
            manager: body.manager,
            contact: {
                hotline: body.phone,
                fax: body.phone,
                email: body.email
            },
            office_type: body.office_type,
            gather_office: body.gather_office
        }

        try {
            createOffice(wrapper)
                .then((res) => {
                    if (res.status !== 200) {
                        setStatus("failure");
                        console.log(res.data);
                        
                        // setErrorText(res.data.data);
                        toast.error("Tạo tài khoản thất bại");
                    } else {
                        toast.success("Tạo tài khoản thành công");
                        onDone && onDone();
                    }
                })
                .catch(() => {
                    toast.error("Lỗi mất rồi")
                })
                .finally(() => {
                    setLoading(false);
                })
        } catch (error) {
            console.log(error);
        }
    }

    async function getSuggestionsOffice(name: string) {
        const response = await getSuggestionOffice(name)
        if (response.status === 200) {
            return response.data.data.offices.map(item => ({
                name: item.name,
                value: item.poid
            }))
        } else {
            return [];
        }
    }

    async function getSuggestionsUser(name: string) {
        const response = await getSuggestionUser(name)
        if (response.status === 200) {
            return response.data.data.users.map(item => ({
                name: item.name,
                value: item.uid
            }))
        } else {
            return [];
        }
    }

    async function getSuggestionForAddress(name: string) {
        const response = await axios.post("/api/address", {}, { params: { keyword: name } })
        if (response.status === 200) {
            console.log(response.data);
            const tm = response.data;
            return [{
                name: tm.map((item: any) => item.name).join(', '),
                value: JSON.stringify(tm.map((item: any) => item.id))
            }];
        } else {
            return [];
        }
    }

    return (
        <form
            onSubmit={submitCreateUserHandler}
            className="p-3">
            <div className="flex gap-3">
                <div className="my-3 flex flex-col gap-2 mb-10 flex-1">
                    <AuthInput
                        status={status}
                        title="Tên điểm"
                        name="name"
                        disabled={loading}
                        placeholder="username"
                        error_text={errorText}
                    />

                    <AuthInput
                        status={status}
                        title="Email"
                        name="email"
                        disabled={loading}
                        placeholder="abc@gmail.com"
                        type="email"
                        error_text={errorText}
                    />

                    <AuthInput
                        status={status}
                        title="Số điện thoại"
                        name="phone"
                        disabled={loading}
                        placeholder="0123456789"
                        error_text={errorText}
                    />

                    <AuthComplete
                        status={status}
                        title="Trưởng điểm"
                        suggestion={getSuggestionsUser}
                        name="manager"
                        disabled={loading}
                        placeholder="address"
                        error_text={errorText}
                    />
                </div>

                <div className="my-3 flex flex-col gap-2 mb-10 flex-1">
                    <AuthSelect
                        status={status}
                        title="Loại điểm"
                        name="office_type"
                        data={officeType}
                        disabled={loading}
                        error_text={errorText}
                    />

                    <AuthComplete
                        status={status}
                        title="Điểm thu"
                        name="gather_office"
                        disabled={loading}
                        suggestion={getSuggestionsOffice}
                        error_text={errorText}
                    />

                    <AuthComplete
                        status={status}
                        title="Địa chỉ"
                        name="address"
                        disabled={loading}
                        suggestion={getSuggestionForAddress}
                        error_text={errorText}
                    />
                </div>
            </div>
            <AuthButton title="Tạo tài khoản" isLoading={loading} type="submit" />
        </form>
    )
}