import { useBeforeUnload } from "@remix-run/react";
import React, { useCallback } from "react";

type TextareaReviewInputProps = {
  error?: string;
  labelName: string;
  name: string;
  value: string;
  emoji: string;
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextareaReviewInput({
  name,
  value,
  labelName,
  emoji,
  changeHandler,
}: TextareaReviewInputProps) {
  useBeforeUnload(
    useCallback(() => {
      if (typeof window !== "undefined") {
        return window.localStorage.setItem(name, value);
      }
    }, [])
  );

  const handleBlur = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      return window.localStorage.setItem(key, value);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name} className="my-2 flex w-full flex-col gap-1">
        {labelName} {emoji}{" "}
      </label>
      <div className="fle">
        <textarea
          name={name}
          id={name}
          rows={6}
          value={value}
          aria-label={`${name}-input`}
          onChange={changeHandler}
          onBlur={() => handleBlur(name, value)}
          className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}