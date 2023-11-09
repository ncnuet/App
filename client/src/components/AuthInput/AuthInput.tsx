"use client";
import { useState } from "react";

type Props = {
  heading: string;
  placeholder: string;
  onFocus: any;
  onChangeText: any;
  user?: boolean;
  lock?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
};

function AuthInput({
  heading,
  placeholder,
  onFocus,
  onChangeText = () => {},
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
        className={`py-2 pl-4 pr-2 bg-gray-100 flex flex-row items-center rounded border ${
          isError
            ? "text-cred-400 border-cred-400"
            : isSuccess
            ? "text-cgreen-600 border-cgreen-600"
            : "text-cgray-500"
        }`}
      >
        {user && <span className="material-symbols-outlined mr-4">person</span>}
        {lock && <span className="material-symbols-outlined mr-4">lock</span>}
        <input
          type={lock ? (isCloseEye ? "password" : "text") : "text"}
          placeholder={placeholder}
          spellCheck={false}
          onFocus={onFocus}
          onChange={(e) => onChangeText(e.target.value)}
          className={`w-full h-[32px] border-none bg-transparent text-[16px] outline-none leading-[100%] ${
            isError
              ? "placeholder-cred-400"
              : isSuccess
              ? "placeholder-cgreen-600"
              : "text-cgray-500"
          }`}
        ></input>
        {lock && (
          <div
            className="px-2 ml-2 flex justify-center items-center hover:cursor-pointer hover:opacity-80"
            onClick={() => setIsCloseEye(!isCloseEye)}
          >
            {!isCloseEye && (
              <span className="material-symbols-outlined">visibility</span>
            )}
            {isCloseEye && (
              <span className="material-symbols-outlined">visibility_off</span>
            )}
          </div>
        )}
        {user && isSuccess && (
          <div className="px-2 ml-2 flex justify-center items-center">
            <span className="material-symbols-outlined">check</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthInput;
