type Props = {
  placeholder: string;
  icon: any;
  name?: string;
  value?: string;
  isBig?: boolean;
  onInfo?: any;
  disabled?: boolean;
  defaultValue?: string;
};

function GdvInput({
  placeholder,
  icon,
  name,
  defaultValue,
  isBig = false,
  disabled = false,
  onInfo = () => { },
  value,
}: Props) {
  return (
    <div
      className={`flex flex-row items-center  w-full ${isBig ? "py-[10px]" : "py-[5px]"
        } px-[10px] rounded-lg bg-cgray-100 text-cgray-500 active:outline-1 active:outline-black`}
    >
      <span className="select-none hover:cursor-pointer hover:opacity-70 text-xl">
        {icon}
      </span>
      <input
        className={
          "px-2 h-full w-full outline-none bg-transparent text-[15px]" +
          `${disabled ? "pointer-events-none" : "pointer-events-auto"}`
        }
        placeholder={placeholder}
        spellCheck={false}
        onChange={(e) => onInfo(e.target.value)}
        value={value}
        name={name}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
}

export default GdvInput;
