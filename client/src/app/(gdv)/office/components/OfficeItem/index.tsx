
import { Button, Modal } from "flowbite-react";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoBrushOutline, IoBusiness, IoRefreshOutline, IoStorefrontOutline, IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { OfficeStatus } from "@/redux/services/queries/office.office";
import { deleteOffice } from "@/redux/services/office.api";

interface IProps {
    data: OfficeStatus,
    onDelete: () => void
}

export default function OfficeItem({ data, onDelete }: IProps) {
    const [loading, setLoading] = useState(false);
    const [showModel, setShowModel] = useState(false);

    function handleDeleteOffice() {
        setLoading(true);
        deleteOffice(data.poid)
            .then((res) => {
                if (res.status === 200) {
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
                <span className="w-10 h-10 rounded-full bg-cyellow-600 text-xl flex justify-center items-center">
                    {data.office_type === "Transaction"
                        ? <IoBusiness />
                        : <IoStorefrontOutline />}
                </span>

                <div className="flex flex-col items-start">
                    <span className="text-sm text-cblue-600 font-bold">
                        {data.name}
                    </span>
                    <span className="text-sm text-[#718096] font-normal">
                        {data.poid}
                    </span>
                </div>
            </div>

            <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm text-cblue-600 font-bold">
                    {data.office_type}
                </span>
            </div>

            <div className="flex">
                <Tippy content="Chỉnh sửa">
                    <Link
                        href={"/office/" + data.poid}>
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
                            <Button color="failure" onClick={() => { setShowModel(false); handleDeleteOffice() }}>
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