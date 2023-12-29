"use client";

import {
  useEffect,
  useState,
} from "react";

import { getDetailStaff } from "@/redux/services/user.api";
import { UserDetail } from "@/redux/services/queries/manager.user";
import { useParams } from "next/navigation";
import AvatarPicker from "@/components/AvatarPicker";
import Permission from "@/components/Permission";
import Account from "@/components/Account";
import Detail from "@/components/Detail";

const StaffInfo = () => {
  const params = useParams();
  const pid = params.pid as string;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserDetail | null>(null);

  const getData = async () => {
    try {
      const response = await getDetailStaff([pid]);

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
    setLoading(true);
    if (pid !== null) {
      getData();
    }
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
              office={data.office ? data.office[0].name : "Chưa gán"}
              address={
                data.office
                  ? data.office[0].address.district.name + ", " + data.office[0].address.province.name
                  : "Chưa xác định"
              } />
          </section>
        </>
      )}
    </main>
  );
};

export default StaffInfo;
