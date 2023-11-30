import { EStatusParcel, ParcelDetail } from "@/redux/services/queries/details.parcel"
import Tippy from '@tippyjs/react';

interface IProps {
    data?: ParcelDetail
}

export default function ({ data }: IProps) {
    return (
        data
            ? <section className="grid grid-cols-2 gap-5" >
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Người gửi</span>
                        <span className="font-semibold">{data.sender.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Số điện thoại</span>
                        <span className="font-semibold">{data.sender.phone}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Nước gửi</span>
                        <span className="font-semibold">
                            {data.sending_add.country?.name + " - " + data.sending_add.country?.id}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Địa chỉ gửi</span>
                        <Tippy
                            theme="light"
                            content={
                                data.sending_add.detail + " - " + data.sending_add.commune?.name + "- " +
                                data.sending_add.district?.name + " - " + data.sending_add.province?.name}>
                            <span className="font-semibold text-right max-w-[50%] truncate">
                                {data.sending_add.district?.name + " - " + data.sending_add.province?.name + "sdcsd"}
                            </span>
                        </Tippy>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Cước phí</span>
                        <span className="font-semibold">13.205đ</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Người nhận</span>
                        <span className="font-semibold">{data.receiver.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Số điện thoại</span>
                        <span className="font-semibold">{data.receiver.phone}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Nước gửi</span>
                        <span className="font-semibold">
                            {data.receiving_add.country?.name + " - " + data.receiving_add.country?.id}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Địa chỉ nhận</span>
                        <Tippy
                            theme="light"
                            content={
                                data.receiving_add.detail + " - " + data.receiving_add.commune?.name + "- " +
                                data.receiving_add.district?.name + " - " + data.receiving_add.province?.name}>
                            <span className="font-semibold text-right max-w-[50%] truncate">
                                {data.receiving_add.district?.name + " - " + data.receiving_add.province?.name}
                            </span>
                        </Tippy>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-cgray-600">Trạng thái</span>
                        <span className="font-semibold">
                            {data.status === EStatusParcel.DELIVERING
                                ? <span className="text-cyellow-500">Đang giao</span>
                                : data.status === EStatusParcel.FAILED
                                    ? <span className="text-cred-400">Không giao được</span>
                                    : <span className="text-cgreen-400">Đã giao</span>}
                        </span>
                    </div>
                </div>
            </section >
            : undefined
    )
}