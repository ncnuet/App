import AuthButton from "@/components/AuthButton";
import AuthComplete from "@/components/AuthComplete";
import AuthInput, { InputStatus } from "@/components/AuthInput/AuthInput";
import AuthSelect from "@/components/AuthSelect";
import { profileState } from "@/redux/features/profile.slice";
import { useAppSelector } from "@/redux/hooks";
import { createOffice, getSuggestionOffice } from "@/redux/services/office.api";
import { createUser, getSuggestionUser } from "@/redux/services/user.api";
import { ResponseData } from "@/utils/axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
    onDone: () => void;
}

const officeType = [
    { name: "Điểm giao dịch", value: "Transaction" },
    { name: "Điểm tập kết", value: "Gathering" }
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

        try {
            // createOffice(body)
            //     .then((res) => {
            //         if (res.status !== 200) {
            //             setStatus("failure");
            //             setErrorText(res.data);
            //             toast.error("Tạo tài khoản thất bại");
            //         } else {
            //             toast.success("Tạo tài khoản thành công");
            //             onDone && onDone();
            //         }
            //     })
            //     .catch(() => {
            //         toast.error("Lỗi mất rồi")
            //     })
            //     .finally(() => {
            //         setLoading(false);
            //     })
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
                        title="office_type"
                        name="name"
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

                    {/* <AuthSelect
                        status={status}
                        title="Địa chỉ"
                        name="address"
                        disabled={loading}
                        error_text={errorText}
                    /> */}
                </div>
            </div>
            <AuthButton title="Tạo tài khoản" isLoading={loading} type="submit" />
        </form>
    )
}