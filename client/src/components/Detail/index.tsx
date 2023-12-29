"use client"

import Button from "@/components/Button";
import GdvInput from "@/components/GdvInput";
import { updateDetail } from "@/redux/services/user.api";
import { FormEvent, useState } from "react";
import {
    IoCaretDownCircleOutline, IoCheckmarkOutline, IoFemaleOutline,
    IoGolfOutline, IoMailOutline, IoMaleOutline, IoPhonePortraitOutline,
    IoPlanetOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

interface IProps {
    pid: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    gender: string
}
type Gender = "Nam" | "Nữ";

export default function Detail({ pid, name, email, address, phone, gender: _gender }: IProps) {
    console.log(pid, name, email, address, phone, _gender);

    const [gender, setGender] = useState<Gender>("Nam");
    const [loading, setLoading] = useState(false);

    const onGender = () => {
        if (gender === "Nam") {
            setGender("Nữ");
        } else {
            setGender("Nam");
        }
    };

    const onInfoSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const body = Object.fromEntries(formData.entries());

        // Xoa gender
        if (body.hasOwnProperty("gender")) {
            delete body.gender;
        }

        console.log(body);

        if (pid !== null) {
            try {
                updateDetail(pid, body)
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
            onSubmit={onInfoSubmitHandler}
            className="flex flex-col gap-3 bg-white rounded-[15px] shadow-sd2">

            <div className="px-[20px] py-[10.75px] flex flex-row justify-between items-center border-b border-b-[#CCD7E2]">
                <h2 className="text-base text-cyellow-600 font-semibold">
                    Thông tin cá nhân
                </h2>
                <Button name="Lưu thông tin" icon={<IoCheckmarkOutline />} disabled={loading} />
            </div>

            <div className="flex flex-col gap-8 pb-[30px] px-[30px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-cgray-600 font-semibold">
                            Tên đầy đủ
                        </h3>
                        <GdvInput
                            isBig
                            icon={<IoPlanetOutline />}
                            placeholder="Phạm Thị Thảo"
                            defaultValue={name || ""}
                            onInfo={() => { }}
                            name="name"
                        />
                        <span className="text-[11px] text-cgray-400 font-normal">
                            Tên này sẽ đại diện cho bạn và hiện thị ở những nơi bạn
                            đến
                        </span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-cgray-600 font-semibold">
                            Email
                        </h3>
                        <GdvInput
                            isBig
                            icon={<IoMailOutline />}
                            placeholder="cogiaothao96@gmail.com"
                            onInfo={() => { }}
                            name="email"
                            defaultValue={email || ""}
                        />
                        <span className="text-[11px] text-cgray-400 font-normal">
                            Địa chỉ liên hệ của bạn là cách để khôi phục mật khẩu nếu
                            bạn quên
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-10 gap-5">
                    <div className="col-span-10 lg:col-span-5 flex flex-col gap-2">
                        <h3 className="text-sm text-cgray-600 font-semibold">
                            Địa chỉ
                        </h3>
                        <GdvInput
                            isBig
                            icon={<IoGolfOutline />}
                            placeholder="Thanh Vân, Thanh Lâm, Mê Linh, Hà Nội"
                            onInfo={() => { }}
                            name="address"
                            defaultValue={address}
                        />
                        <span className="text-[11px] text-cgray-400 font-normal">
                            Nơi bạn đang cư trú
                        </span>
                    </div>

                    <div className="col-span-5 lg:col-span-3 flex flex-col gap-2">
                        <h3 className="text-sm text-cgray-600 font-semibold">
                            Số điện thoại
                        </h3>
                        <GdvInput
                            isBig
                            icon={<IoPhonePortraitOutline />}
                            placeholder="0123456789"
                            onInfo={() => { }}
                            name="phone"
                            defaultValue={phone}
                        />

                        <span className="text-[11px] text-cgray-400 font-normal">
                            Cách chúng tôi liên hệ với bạn
                        </span>
                    </div>

                    <div className=" col-span-5 lg:col-span-2 flex flex-col gap-2">
                        <h3 className="text-sm text-cgray-600 font-semibold">
                            Giới tính
                        </h3>
                        <div className="flex flex-row items-center gap-2 p-[10px] text-cgray-500  rounded-lg bg-cgray-100 select-none">
                            {gender === "Nam"
                                ? <span className="text-xl"><IoMaleOutline /></span>
                                : <span className="text-xl"><IoFemaleOutline /></span>}

                            <span className="text-[15px]">{gender}</span>

                            <input
                                type="hidden"
                                className="bg-transparent text-[15px] w-fit"
                                value={gender}
                                name="gender"
                            />

                            <span
                                className="ml-auto hover:opacity-70 active:opacity-90 text-xl"
                                onClick={onGender}
                            >
                                <IoCaretDownCircleOutline />
                            </span>
                        </div>
                        <span className="text-[11px] text-cgray-400 font-normal">
                            Giới tính của bạn
                        </span>
                    </div>
                </div>
            </div>
        </form>
    )
}