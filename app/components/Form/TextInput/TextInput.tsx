import React, { useCallback } from "react";
import { useBeforeUnload } from "@remix-run/react";

interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  labelName: string;
  name: string;
  type: string;
  value: string;
  emoji?: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  labelName,
  name,
  type,
  value,
  emoji,
  changeHandler,
}: ITextInputProps) {
  useBeforeUnload(
    useCallback(() => {
      localStorage.setItem(name, value);
    }, [name, value])
  );

  const handleBlur = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      return window.localStorage.setItem(key, value);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name} className="my-2 flex w-full flex-col gap-1">
        {labelName}&nbsp;
        {emoji ? emoji : ""}{" "}
      </label>
      <div className="flex">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={changeHandler}
          aria-label={`${name}-input`}
          onBlur={() => handleBlur(name, value)}
          className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
