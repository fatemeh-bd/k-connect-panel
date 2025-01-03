import React, { InputHTMLAttributes } from "react";

export type InputPropsType = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> & {
  label: string;
  errorText?: string;
  className?: string;
  icon?: React.ReactNode;
};

export type TextAreaType = Omit<
  InputHTMLAttributes<HTMLTextAreaElement>,
  "className"
> & {
  className?: string;
  errorText?: string;
};
