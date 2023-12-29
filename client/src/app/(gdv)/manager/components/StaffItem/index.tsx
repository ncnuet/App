import { UserStatus } from "@/redux/services/queries/manager.user";
import { deleteUser, updateActive } from "@/redux/services/user.api";
import { Button, Modal } from "flowbite-react";
import Tippy from "@tippyjs/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoBanOutline, IoBrushOutline, IoCheckmarkCircleOutline, IoRefreshOutline, IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface IProps {
    data: UserStatus,
    onDelete: () => void
}

const mockStaff: UserStatus = {
    avatar:
        "https://res.cloudinary.com/dxqd4odva/image/upload/v1703748165/VCA_app/avatars/cool-girl_avoub9.jpg",
    email: "esthera@simmmple.com",
    username: "Esthera Jackson",
    role: "Nhân viên",
    uid: "1",
    name: "asa",
    active: false,
    office: [{
        name: "Esthera Jackson",
    }]
};

export default function StaffItem({ data, onDelete }: IProps) {
    const [active, setActive] = useState(data.active);
    const [loading, setLoading] = useState(false);
    const [showModel, setShowModel] = useState(false);

    function handleActiveUser() {
        setLoading(true);
        updateActive(data.uid, !active)
            .then(() => {
                setActive(!active);
                toast.success("Cập nhật thành công")
            })
            .catch((e) => {
                toast.error(e.message)
            })
            .finally(() => { setLoading(false) });
    }

    function handleDeleteUser() {
        setLoading(true);
        deleteUser(data.uid)
            .then((res) => {
                if (res.status === 200) {
                    setActive(!active);
                    onDelete && onDelete()
                    toast.success("Xóa thành công")
                } else {
                    toast.error("Lỗi mất rồi")
                }
            })
            .catch((e) => {
                toast.error(e.message)
            })
            .finally(() => { setLoading(false) });
    }

    return (
        <div className="grid grid-cols-3 pb-[10px] items-center border-b border-b-[#E2E8F0]">
            <div className="col-span-2 lg:col-span-1 flex flex-row gap-[10px] items-center">
                <Image
                    src={data.avatar || mockStaff.avatar}
                    alt="cool girl"
                    className="hidden sm:block flex-none h-9 w-9 rounded-[18px] object-cover"
                    loading="lazy"
                    width={36}
                    height={36}
                />
                <div className="flex flex-col items-start">
                    <span className="text-sm text-cblue-600 font-bold">
                        {data.username}
                    </span>
                    <span className="text-sm text-[#718096] font-normal">
                        {data.email}
                    </span>
                </div>
            </div>
            <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm text-cblue-600 font-bold">
                    {data.role}
                </span>
                <span className="text-sm text-[#718096] font-normal">
                    {data.office[0].name}
                </span>
            </div>
            <div className="flex">
                <Tippy content="Chỉnh sửa">
                    <Link
                        href={"/manager/" + data.uid + "/setting"}>
                        <p className="text-blue-500 px-2 text-lg">
                            <IoBrushOutline />
                        </p>
                    </Link>
                </Tippy>


                <Tippy content="Xóa tài khoản">
                    <button
                        disabled={loading}
                        onClick={() => { setShowModel(true) }}
                        className="text-lg px-2">
                        {loading
                            ? <span className="text-gray-500 animate-spin"><IoRefreshOutline /></span>
                            : <span className="text-red-500"><IoTrashOutline /></span>}
                    </button>
                </Tippy>

                <Tippy content={active ? "Cấm tài khoản" : "Dỡ bỏ lệnh cấm"}>
                    <button
                        disabled={loading}
                        onClick={handleActiveUser}
                        className="text-lg  px-2">
                        {
                            loading
                                ? <span className="text-gray-500 animate-spin"><IoRefreshOutline /></span>
                                : active
                                    ? <span className="text-yellow-500"><IoBanOutline /></span>
                                    : <span className="text-green-500"> <IoCheckmarkCircleOutline /> </span>
                        }
                    </button>
                </Tippy>
            </div>

            <Modal show={showModel} size="md" onClose={() => setShowModel(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Bạn có chắc muốn xóa tài khoản này khồng?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => { setShowModel(false); handleDeleteUser() }}>
                                {"Có, Tôi chắc"}
                            </Button>
                            <Button color="gray" onClick={() => setShowModel(false)}>
                                Không
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}