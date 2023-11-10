type Props = {
  placeholder: string;
  icon: string;
  value?: string;
  isBig?: boolean;
  onInfor?: any;
};

function GdvInput({ placeholder, icon, isBig = false, onInfor, value }: Props) {
  return (
    <div
      className={`flex flex-row h-full w-full ${
        isBig ? "py-[10px]" : "py-[5px]"
      } px-[10px] rounded-lg bg-cgray-100 text-cgray-500`}
    >
      <span className="material-symbols-outlined select-none hover:cursor-pointer hover:opacity-70">
        {icon}
      </span>
      <input
        className="px-2 h-full w-full outline-none bg-transparent text-[15px]"
        placeholder={placeholder}
        spellCheck={false}
        onChange={(e) => onInfor(e.target.value)}
        value={value}
      ></input>
    </div>
  );
}

export default GdvInput;
