"use client";
import { useEffect, useState } from "react";
import { IoAddOutline, IoRefresh, IoReloadOutline } from "react-icons/io5";
import StaffItem from "./components/StaffItem";
import { getManagerStatus, getStaffStatus } from "@/redux/services/user.api";
import Button from "@/components/Button";
import { UserStatus } from "@/redux/services/queries/manager.user";
import { Modal } from "flowbite-react";
import FormCreate from "./components/FormCreate";
import { useAppSelector } from "@/redux/hooks";
import { profileState } from "@/redux/features/profile.slice";

const ManagerPage = () => {
  const [staffData, setStaffData] = useState<UserStatus[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(profileState);

  const getData = async () => {
    setLoading(true);
    try {
      const response = user.role === "admin" || user.role === "bod"
        ? await getManagerStatus()
        : await getStaffStatus(user.office);

      if (response.data.data) {
        setStaffData(response.data.data.users || []);
      } else {
        setStaffData([]);
      }
    } catch {
      setStaffData([]);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function refreshData() {
    getData();
  }

  return (
    <main className="w-full h-fit max-h-full overflow-hidden flex flex-col gap-3 p-6 rounded-[15px] shadow-sd2 bg-white">
      <div className="flex justify-between">
        <h2 className="text-lg text-cblue-600 font-bold">
          Quản lý tài khoản
        </h2>

        <div className="flex gap-2">
          <Button name="Tải lại" icon={<IoRefresh />} onClick={() => refreshData()} />
          <Button name="Tạo mới" icon={<IoAddOutline />} onClick={() => setShowCreatePopup(true)} />
        </div>
      </div>

      <div className="max-h-full flex flex-col gap-2 px-1 -mr-7">
        <section className="grid grid-cols-3 pt-2 pb-[18px] border-b border-b-[#E2E8F0] mr-7">
          <h3 className="col-span-2 lg:col-span-1 text-sm text-[#A0AEC0] font-bold ">
            Tài khoản
          </h3>
          <h3 className="hidden lg:block text-sm text-[#A0AEC0] font-bold ">
            Chức vụ
          </h3>
          <h3 className="text-sm text-[#A0AEC0] font-bold ">Quản lý</h3>
        </section>

        {loading
          ? <section className="text-center">
            <span className="text-cyellow-500 animate-spin text-3xl">
              <IoReloadOutline />
            </span>
          </section>
          : staffData !== null && (
            <section className="flex-grow overflow-scroll flex flex-col gap-4 list pr-7 pt-3">
              {staffData.map((item, index) => (
                <StaffItem data={item} key={index} onDelete={() => { refreshData() }} />
              ))}
            </section>
          )
        }

      </div>

      <Modal show={showCreatePopup} size="md" onClose={() => setShowCreatePopup(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <h1>Tạo tài khoản mới</h1>
          <FormCreate onDone={() => { setShowCreatePopup(false); refreshData() }} />
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default ManagerPage;
