type Props = {
  placeholder: string;
  icon: string;
  name?: string;
  value?: string;
  isBig?: boolean;
  onInfor?: any;
  disabled?: boolean;
  defaulValue?: string;
};

function GdvInput({
  placeholder,
  icon,
  name,
  defaulValue,
  isBig = false,
  disabled = false,
  onInfor = () => {},
  value,
}: Props) {
  return (
    <div
      className={`flex flex-row items-center  w-full ${
        isBig ? "py-[10px]" : "py-[5px]"
      } px-[10px] rounded-lg bg-cgray-100 text-cgray-500 active:outline-1 active:outline-black`}
    >
      <span className="material-symbols-outlined select-none hover:cursor-pointer hover:opacity-70">
        {icon}
      </span>
      <input
        className={
          "px-2 h-full w-full outline-none bg-transparent text-[15px]" +
          `${disabled ? "pointer-events-none" : "pointer-events-auto"}`
        }
        placeholder={placeholder}
        spellCheck={false}
        onChange={(e) => onInfor(e.target.value)}
        value={value}
        name={name}
        defaultValue={defaulValue}
      ></input>
    </div>
  );
}

export default GdvInput;
