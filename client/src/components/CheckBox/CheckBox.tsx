type CheckBoxProps = {
  isChecked: boolean;
  content?: string;
};

export default function CheckBox({ isChecked, content = "" }: CheckBoxProps) {
  return (
    <div className="flex flex-row">
      <div className="w-6 h-6 flex flex-row justify-center items-center border-[2px] border-black">
        {isChecked && <span className="material-symbols-outlined">check</span>}
      </div>
      {content && (
        <span className=" text-[15px] text-black font-normal ml-2">
          {content}
        </span>
      )}
    </div>
  );
}
