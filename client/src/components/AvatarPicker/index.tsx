import Image from "next/image";
import prettyGirl from "@/assets/images/girl.png";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { updateAvatar } from "@/redux/services/user.api";
import { toast } from "react-toastify";

interface IProps {
    avatar: string;
    pid: string;
}

export default function AvatarPicker({ avatar: _avatar, pid }: IProps) {
    const [avatar, setAvatar] = useState<string | null>(_avatar);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const onResetAvatar = () => {
        setAvatar(null);
    };

    const onSubmitAvatar = async () => {
        if (pid !== null && avatar !== null) {
            try {
                updateAvatar(pid, avatar)
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

    const onBrowser = () => {
        fileInputRef.current?.click();
    };

    const onFileSelectedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file && file[0]?.type?.split("/")[0] === "image") {
            const reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onloadend = () => {
                const base64 = reader.result;
                if (base64) {
                    setAvatar(base64.toString());
                }
            };
        }
    };

    const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = "copy";
    };

    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files;
        if (file && file[0]?.type?.split("/")[0] === "image") {
            const reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onloadend = () => {
                const base64 = reader.result;
                if (base64) {
                    setAvatar(base64.toString());
                }
            };
        }
    };

    return (
        <div className="flex flex-col gap-3 bg-white rounded-[15px] shadow-sd2">
            <h2 className="p-[20px] py-4 text-base text-cyellow-600 font-semibold border-b border-b-gray-100">
                Ảnh đại diện
            </h2>

            <div className="flex flex-col gap-3 pb-[30px] px-[30px]">
                <div className="flex flex-row gap-3 items-center select-none">
                    <Image
                        src={avatar ? avatar : prettyGirl}
                        alt="good-girl"
                        width={avatar ? 48 : undefined}
                        height={avatar ? 48 : undefined}
                        className="flex-none w-12 h-12 rounded-[24px] outline outline-cyellow-500 object-cover"
                    />

                    <div className="flex flex-col">
                        <span className="text-[15px] text-cgray-600 font-normal">
                            Chỉnh sửa ảnh đại diện
                        </span>
                        <div className="flex flex-row gap-3 items-center">
                            <span
                                className="text-[15px] text-cgray-500 font-medium cursor-pointer hover:opacity-80"
                                onClick={onResetAvatar}
                            >
                                Đặt về mặc định
                            </span>
                            <button
                                disabled={loading}
                                className="text-[15px] text-cblue-300 font-medium cursor-pointer hover:opacity-80"
                                onClick={onSubmitAvatar}
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={onBrowser}
                    className={
                        "relative flex flex-col gap-3 items-center p-5 outline-dashed outline-[1px] rounded-[10px] select-none cursor-pointer hover:opacity-70 active:opacity-90 mt-3 " +
                        `${isDragging ? "outline-cblue-300" : "outline-[#CCD7E2]"}`
                    }
                >
                    <span
                        className={
                            "flex flex-row justify-center items-center w-[44px] h-[44px] rounded-[22px] " +
                            `${isDragging ? "bg-cblue-300" : "bg-cgray-100"}`
                        }
                    >
                        <span
                            className={
                                "material-symbols-outlined " +
                                `${isDragging ? "text-white" : "text-cgray-400"}`
                            }
                        >
                            cloud_upload
                        </span>
                    </span>
                    <div className="flex flex-row items-end gap-1">
                        <span className="text-[15px] text-cblue-300 font-medium cursor-pointer hover:opacity-80">
                            {isDragging ? "Thả tại đây" : "Click để tải ảnh lên"}
                        </span>
                        {!isDragging && (
                            <span className="text-[14px] text-cgray-400 font-normal">
                                hoặc kéo thả
                            </span>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={onFileSelectedHandler}
                        ></input>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-cgray-400 font-normal">
                            SVG, PNG hoặc JPG
                        </span>
                        <span className="text-[11px] text-cgray-400 font-normal">
                            (tối đa 800 x 800px)
                        </span>
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-transparent"></div>
                </div>
            </div>
        </div>
    )
}