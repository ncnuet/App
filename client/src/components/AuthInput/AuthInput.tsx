"use client";
import { useState } from "react";
import Lock from "@/icons/Lock";
import User from "@/icons/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

type Props = {
  heading: string;
  placeholder: string;
  user?: boolean;
  lock?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
};

function AuthInput({
  heading,
  placeholder,
  user = false,
  lock = false,
  isError = false,
  isSuccess = false,
}: Props) {
  const [isCloseEye, setIsCloseEye] = useState(true);
  return (
    <div>
      <h3 className="text-[12px] text-gray-600 font-[500] pb-2">{heading}</h3>
      <div
        className={`py-2 pl-4 pr-2 bg-gray-100 flex flex-row items-center rounded-sm border ${
          isError
            ? "text-error border-error"
            : isSuccess
            ? "text-success border-success"
            : "text-normal"
        }`}
      >
        {user && <User width="24" height="24" className={"mr-[16px]"}></User>}
        {lock && <Lock width="24" height="24" className={"mr-[16px]"}></Lock>}
        <input
          type={lock ? (isCloseEye ? "password" : "text") : "text"}
          placeholder={placeholder}
          spellCheck={false}
          className={`w-full h-[32px] border-none bg-transparent text-[16px] outline-none leading-[100%] ${
            isError
              ? "placeholder-error"
              : isSuccess
              ? "placeholder-success"
              : "text-normal"
          }`}
        ></input>
        {lock && (
          // <OpenEye
          //   width="24"
          //   height="24"
          //   className={"ml-4 hover:cursor-pointer hover:opacity-80"}
          // ></OpenEye>
          <div
            className="px-2 ml-2 flex justify-center items-center hover:cursor-pointer hover:opacity-80"
            onClick={() => setIsCloseEye(!isCloseEye)}
          >
            {!isCloseEye && (
              <FontAwesomeIcon
                icon={faEye}
                className="w-6 h-6"
              ></FontAwesomeIcon>
            )}
            {isCloseEye && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="w-6 h-6"
              ></FontAwesomeIcon>
            )}
          </div>
        )}
        {user && isSuccess && (
          <div className="px-2 ml-2 flex justify-center items-center">
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthInput;
