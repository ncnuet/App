"use client";
import { useState, useEffect, useRef } from "react";
interface IParcelSave {
  isModal: boolean;
  onSave: any;
  onChangeModal: any;
  onPreview: any;
}
const ParcelSave = ({
  isModal,
  onSave,
  onChangeModal,
  onPreview,
}: IParcelSave) => {
  const [isPending, setIsPending] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);

  const onClosePopup = () => {
    popupRef.current?.classList.toggle("gdv-hidden-animation");
    timeoutRef.current = setTimeout(() => {
      popupRef.current?.classList.toggle("gdv-hidden-animation");
      setIsDone(false);
      onChangeModal();
    }, 300);
  };

  useEffect(() => {
    if (isPending) {
      timeoutRef.current = setTimeout(() => {
        onSave();
        setIsPending(false);
        setIsDone(true);
      }, 1000);
    }
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, [isPending]);

  useEffect(() => {
    if (isDone) {
      timeoutRef.current = setTimeout(() => {
        onClosePopup();
      }, 800);
    }
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, [isDone]);
  return (
    <div
      onClick={onClosePopup}
      className="absolute top-0 bottom-0 left-0 right-0 bg-[#0000004d] flex flex-row justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        ref={popupRef}
        className={
          "relative min-w-[300px] md:min-w-[400px] lg:min-w-[500px] max-w-full h-fit p-6 rounded-[15px] bg-white flex flex-col gap-3 items-center " +
          `${isModal && "gdv-animation"}`
        }
      >
        {!isDone && (
          <div className="absolute top-2 right-2" onClick={onClosePopup}>
            <span className="material-symbols-outlined text-cgray-500 text-4xl select-none cursor-pointer hover:opacity-75 active:opacity-90">
              cancel
            </span>
          </div>
        )}
        {!isDone && (
          <h3 className="text-xl text-cblue-600 font-bold pt-6">
            Bạn có muốn xem trước hóa đơn?
          </h3>
        )}
        <div className="flex flex-col items-center text-cblue-600 gap-2">
          {isPending && (
            <span className="material-symbols-outlined text-3xl font-semibold animate-spin">
              progress_activity
            </span>
          )}
          {isDone && (
            <span className="material-symbols-outlined text-5xl text-cgreen-400">
              task_alt
            </span>
          )}
          {isPending && <span className="font-semibold">Đang lưu...</span>}
          {isDone && <span className="font-medium">Lưu Thành công!</span>}
        </div>
        {!isDone && (
          <div className="flex flex-row items-center gap-10">
            <button
              onClick={() => setIsPending(true)}
              className={
                "min-w-[125px] px-[10px] py-2 rounded-lg flex flex-row items-center gap-1 bg-cgreen-600 text-white select-none " +
                `${
                  isPending
                    ? "pointer-events-none opacity-50"
                    : "hover:opacity-80 active:opacity-90"
                }`
              }
            >
              <span className="material-symbols-outlined text-[22px]">
                work_update
              </span>
              <span className="text-[16px] font-normal">Chỉ lưu</span>
            </button>
            <button
              onClick={onPreview}
              className={
                "min-w-[125px] px-[10px] py-2 rounded-lg flex flex-row items-center gap-1 bg-cyellow-500 text-black select-none " +
                `${
                  isPending
                    ? "pointer-events-none opacity-50"
                    : "hover:opacity-80 active:opacity-90"
                }`
              }
            >
              <span className="material-symbols-outlined text-[22px]">
                pageview
              </span>
              <span className="text-[16px] font-normal">Xem trước</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParcelSave;
