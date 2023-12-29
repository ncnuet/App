"use client"

import Account from "@/components/Account";
import AvatarPicker from "@/components/AvatarPicker";
import Detail from "@/components/Detail";
import Permission from "@/components/Permission";
import { profileState } from "@/redux/features/profile.slice";
import { useAppSelector } from "@/redux/hooks";
import { UserDetail } from "@/redux/services/queries/manager.user";
import { getDetailStaff } from "@/redux/services/user.api";
import { useEffect, useState } from "react";

export default function MeEditor() {
    const user = useAppSelector(profileState);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<UserDetail | null>(null);

    const getData = async () => {
        try {
            const response = await getDetailStaff([user.uid]);
            console.log(response);

            if (response.data.data) {
                setData(response.data.data.users[0]);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <main
            className="max-h-full overflow-scroll -mr-5 pr-5 pb-10 grid grid-cols-10 gap-5 xl:gap-3 list"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}>

            {data !== null && (
                <>
                    <section className="col-span-10 xl:col-span-7 flex flex-col gap-5">

                        <Detail
                            pid={data.uid} email={data.email} name={data.name}
                            phone={data.phone} gender="Nam" address="a" />
                        <Account pid={data.uid} username={data.username} />
                    </section>

                    <section className="col-span-10 xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-5">
                        <AvatarPicker avatar={data.avatar} pid={data.uid} />
                        <Permission
                            role={data.role}
                            office={data.office[0].name}
                            address={data.office[0].address.district.name + ", " + data.office[0].address.province.name} />
                    </section>
                </>
            )}
        </main>
    )
}