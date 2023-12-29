import AuthButton from "@/components/AuthButton";
import AuthInput, { InputStatus } from "@/components/AuthInput/AuthInput";
import { profileState } from "@/redux/features/profile.slice";
import { useAppSelector } from "@/redux/hooks";
import { createUser } from "@/redux/services/user.api";
import { ResponseData } from "@/utils/axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
    onDone: () => void;
}

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

        try {
            createUser(body)
                .then((res) => {
                    if (res.status !== 200) {
                        setStatus("failure");
                        setErrorText(res.data);
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

    return (
        <form
            onSubmit={submitCreateUserHandler}
            className="p-3">
            <div className="my-3 flex flex-col gap-2 mb-10">
                <AuthInput
                    status={status}
                    title="Tên tài khoản"
                    name="username"
                    disabled={loading}
                    placeholder="username"
                    error_text={errorText}
                />

                <AuthInput
                    status={status}
                    title="Tên người dùng"
                    name="name"
                    disabled={loading}
                    placeholder="name"
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
            </div>

            <AuthButton title="Tạo tài khoản" isLoading={loading} type="submit" />
        </form>
    )
}