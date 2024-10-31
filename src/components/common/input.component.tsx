"use client";
import React from "react";

type compononentPropType = {
  placeholder: string;
  className?: string;
  value?: string;
  type?: string;
  onChange?: (e: string) => void;
};

const InputComponent = ({
  placeholder,
  className,
  value,
  type,
  onChange,
}: compononentPropType) => {
  return (
    <input
      value={value}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      type={type ? type : "text"}
      // required
      placeholder={placeholder}
      className={`rounded-lg px-5 py-3 border border-[#B6B4A2] text-[#100F0F] opacity-60 bg-theme-gray ${className ? className : ""}`}
    />
  );
};

export default InputComponent;
