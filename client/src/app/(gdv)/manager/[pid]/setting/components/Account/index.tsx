import Button from "@/components/Button";
import GdvInput from "@/components/GdvInput";
import { updateAccount } from "@/redux/services/user.api";
import { FormEvent, useState } from "react";
import { IoFingerPrintOutline, IoPersonCircleOutline, IoThunderstormOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface IProps {
    pid: string;
    username: string;
}

export default function Account({ pid, username }: IProps) {
    const [loading, setLoading] = useState(false);

    const onAccountSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const body = Object.fromEntries(formData.entries());

        if (pid !== null) {
            try {
                updateAccount(pid, body.password as string, body.username as string)
                    .then(() => {
                        toast.success("Đổi thông tin thành công")
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
    };

    return (
        <form
            onSubmit={onAccountSubmitHandler}
            className="flex flex-col gap-3 bg-white rounded-[15px] shadow-sd2"
        >
            <div
                className="px-[20px] py-[12px] flex flex-row justify-between items-center border-b border-b-[#CCD7E2]">
                <h2 className="text-base text-cyellow-600 font-semibold">
                    Tài khoản đăng nhập
                </h2>
                <Button name="Đổi mật khẩu" icon={<IoThunderstormOutline />} disabled={loading} />
            </div>
            <div className="flex flex-col gap-8 pb-[30px] px-[30px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-cgray-600 font-semibold">
                            Tên đăng nhập
                        </h3>
                        <GdvInput
                            isBig
                            icon={<IoPersonCircleOutline />}
                            placeholder="Phạm Thị Thảo"
                            onInfo={() => { }}
                            disabled={true}
                            defaultValue={username || ""}
                            name="username"
                        ></GdvInput>
                        <span className="text-[11px] text-cgray-400 font-normal">
                            Tên để đăng nhập vào tài khoản
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-cgray-600 font-semibold">
                            Mật khẩu
                        </h3>
                        <GdvInput
                            isBig
                            icon={<IoFingerPrintOutline />}
                            placeholder="********"
                            onInfo={() => { }}
                            name="password"
                        ></GdvInput>
                        <span className="text-[11px] text-cgray-400 font-normal">
                            Mật khẩu để đăng nhập vào tài khoản
                        </span>
                    </div>
                </div>
            </div>
        </form>
    )
}