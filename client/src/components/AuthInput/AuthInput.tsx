"use client";
import { TextInputProps } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdLock, MdPerson, MdVisibility, MdVisibilityOff } from "react-icons/md"

export type InputStatus = "success" | "failure" | "normal";

interface IProps extends TextInputProps {
  title: string,
  user?: boolean;
  isHiddenPassword?: boolean;
  status?: InputStatus;
  name: string,
  error_text?: {
    name: string;
    message: string;
  };
}

function AuthInput({
  title,
  error_text,
  name,
  placeholder,
  onChange,
  type = "text",
  status = "normal"
}: IProps) {

  function onFocusHandler() {
    if (status === "failure") setInnerStatus("normal");
  }

  useEffect(() => {
    setInnerStatus(status)
  }, [status])

  const [isCloseEye, setIsCloseEye] = useState(true);
  const [innerStatus, setInnerStatus] = useState<InputStatus>("normal");

  return (
    <div>
      <h3 className="text-[12px] text-gray-600 font-[500] pb-2">{title}</h3>
      <div
        className={"py-2 pl-4 pr-2 bg-gray-100 flex flex-row items-center rounded border " +
          (innerStatus === "failure"
            ? "text-cred-400 border-cred-400"
            : innerStatus === "success"
              ? "text-cgreen-600 border-cgreen-600"
              : "text-cgray-500"
          )}>

        {/* Icon */}
        {
          type === "password" && <span className="mr-4 text-xl"><MdLock></MdLock></span> ||
          <span className="mr-4 text-xl"><MdPerson></MdPerson></span>
        }

        {/* Input area */}
        <input
          name={name}
          type={type === "password" ? (isCloseEye ? "password" : "text") : "text"}
          placeholder={placeholder}
          spellCheck={false}
          onFocus={onFocusHandler}
          onChange={onChange}
          className={"w-full h-[32px] border-none bg-transparent text-[16px] outline-none leading-[100%] " +
            (innerStatus === "failure"
              ? "placeholder-cred-400"
              : innerStatus === "success"
                ? "placeholder-cgreen-600"
                : "text-cgray-500"
            )}
        />

        {/* Supfix icon */}
        {type === "password" && (
          <div
            className="px-2 ml-2 flex justify-center items-center hover:cursor-pointer hover:opacity-80"
            onClick={() => setIsCloseEye(!isCloseEye)}
          >
            {!isCloseEye
              ? <span className="text-xl"><MdVisibility></MdVisibility></span>
              : <span className="text-xl"><MdVisibilityOff></MdVisibilityOff></span>
            }
          </div>
        )}

        {type !== "password" && innerStatus === "success" && (
          <div className="px-2 ml-2 flex justify-center items-center">
            <span className="material-symbols-outlined">check</span>
          </div>
        )}
      </div>
      <span className="text-sm text-cred-400">{error_text?.name === name ? error_text.message : ""}</span>
    </div>
  );
}

export default AuthInput;
